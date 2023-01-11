import os
import pickle
import time
from datetime import datetime, timedelta
from DatabaseManager import DatabaseManager

db = DatabaseManager()

import pandas as pd

from data_manager import modify_val, request_sensor, request_shift, read_log, post_session
from machine_learning_modules import add_machine_state
from machine_learning_modules import normalize, warning_prediction, classify_pp

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from tensorflow import keras
import numpy as np


# Constants
shift_cost = 0.0
shift_name = ''
session_day = 0
shift_data = request_shift()

# dictionary with the output data
output_data = {}
sensor_data = {}
constant_data = {
    'number_item_current': 0,
    'average_item_processed': 0,
    'prev_machine_state': 0,
    'prediction_energy_consumed': 0,
    'threshold': 0,
    'number_alarm_triggered': 0,
    'actual_shift': '',
    "actual_day": "",
    'row_current_shift': 0,
    'power_var': 0,
    'cycle_var': 0,
    "incremental_cycle_time_avg": 0,
    "incremental_energy_cost": 0,
    "incremental_items_avg": 0,
    "incremental_power": 0,
    "incremental_power_avg": 0,
    "consecutive_alarm": 0,
    "last_alarm": 0
}

try:
    # see if a txt file exists
    with open('constant.txt', 'r') as f:
        # read the file
        file = f.read()
except FileNotFoundError:
    modify_val(constant_data)

# LSTM
model = keras.models.load_model('model')
# MixtureGaussian
with open('trained_part_program.model', 'rb') as f:
    pp_model = pickle.load(f)

# Iterate over the rows in the data
for data in request_sensor():
    # Extract the variables from the data
    # Convert the values in the data dictionary to the appropriate data types
    sensor_data['cycle_time'] = float(data['cycle_time'])
    sensor_data['idle_time'] = int(data['idle_time'])
    sensor_data['working_time'] = int(data['working_time'])
    sensor_data['power_working'] = float(data['power_working'])
    sensor_data['items'] = int(data['items'])
    sensor_data['power_avg'] = float(data['power_avg'])
    sensor_data['power_idle'] = float(data['power_idle'])
    sensor_data['power_max'] = float(data['power_max'])
    sensor_data['power_min'] = float(data['power_min'])
    # Add the values for the "alarm" keys
    sensor_data['alarm_1'] = int(data['alarm_1'])
    sensor_data['alarm_2'] = int(data['alarm_2'])
    sensor_data['alarm_3'] = int(data['alarm_3'])
    sensor_data['alarm_4'] = int(data['alarm_4'])
    # Introducing data to pass in output
    sensor_data['asset'] = data['asset']
    # Convert the string to a datetime object using strptime
    sensor_data['ts'] = datetime.strptime(data['ts'], '%a, %d %b %Y %H:%M:%S %Z')
    # year, month and day of sensor_data['ts']
    year = sensor_data['ts'].year
    month = sensor_data['ts'].month
    day = sensor_data['ts'].day

    # Print the variables to the console
    # print(f'Data incoming from sensor:\n {sensor_data}')
    # Iterate over the possible shifts
    for shift in shift_data:
        shift_start = datetime.strptime(shift['shift_start'], '%a, %d %b %Y %H:%M:%S %Z'). \
            replace(year=year, month=month, day=day)
        shift_end = datetime.strptime(shift['shift_end'], '%a, %d %b %Y %H:%M:%S %Z'). \
            replace(year=year, month=month, day=day)
        if (shift_start > shift_end) & (shift_start.hour > 12):
            shift_start = shift_start - timedelta(days=1)
        if (shift_end < shift_start) & (shift_end.hour < 12):
            shift_end = shift_end + timedelta(days=1)

        if shift_start <= sensor_data['ts'] < shift_end:
            shift_cost = float(shift['shift_cost'])
            shift_name = shift['shift_name']
            session_day = day
            break

    # ------------------------------------------------------------------------------------------------------------------

    log_value = read_log()

    # Energy cost of the actual consumption
    output_data['energy_cost'] = shift_cost * float(sensor_data['power_avg']) / 1000

    if log_value['actual_shift'] != shift_name:
        post_session(log_value)
        constant_data = {'number_item_current': 0, 'average_item_processed': 0, 'prev_machine_state': 0,
                         'threshold': 0, 'number_alarm_triggered': log_value['number_alarm_triggered'],
                         'actual_shift': shift_name, 'actual_day': session_day, 'row_current_shift': 0,
                         'power_var': 0,
                         'prediction_energy_consumed': log_value['prediction_energy_consumed'],
                         'cycle_var': 0, "incremental_cycle_time_avg": 0, "incremental_energy_cost": 0,
                         "incremental_items_avg": 0, "incremental_power": 0, "incremental_power_avg": 0}
        modify_val(constant_data)
        log_value = read_log()
        output_data['power_var'] = 0
        output_data['cycle_var'] = 0
        output_data["incremental_cycle_time_avg"] = sensor_data['cycle_time']
        output_data["incremental_energy_cost"] = output_data['energy_cost']
        output_data["incremental_items_avg"] = sensor_data['items']
        output_data["incremental_power"] = sensor_data['power_avg']
        output_data["incremental_power_avg"] = sensor_data['power_avg']
    else:
        # compute new incremental metrics

        # means
        row_number = log_value['row_current_shift']
        output_data["incremental_cycle_time_avg"] = (log_value["incremental_cycle_time_avg"] * row_number +
                                                     sensor_data['cycle_time']) / (row_number + 1)
        output_data["incremental_energy_cost"] = output_data['energy_cost'] + log_value['incremental_energy_cost']
        output_data["incremental_items_avg"] = (log_value['incremental_items_avg'] * row_number + sensor_data[
            'items']) / (row_number + 1)
        output_data["incremental_power"] = sensor_data['power_avg'] + log_value['incremental_power']
        output_data["incremental_power_avg"] = (log_value['incremental_power_avg'] * row_number + sensor_data[
            'power_avg']) / (row_number + 1)
        # var
        output_data['power_var'] = log_value['power_var'] + (
                sensor_data['power_avg'] - output_data["incremental_power_avg"]) * (
                                                       sensor_data['power_avg'] - output_data["incremental_power_avg"]) \
                                               / (row_number + 1)
        output_data['cycle_var'] = log_value['cycle_var'] + (
                sensor_data['cycle_time'] - output_data["incremental_cycle_time_avg"]) * (
                                                            sensor_data['cycle_time'] -
                                                            output_data["incremental_cycle_time_avg"]) / (row_number + 1)

    constant_data['actual_shift'] = shift_name
    constant_data['actual_day'] = session_day

    # Prediction of the Energy Consumed
    tmp = pd.DataFrame(sensor_data, index=[0])
    p = tmp[['items', 'working_time', 'idle_time', 'power_avg', 'power_min',
             'power_max', 'power_working', 'power_idle', 'cycle_time', 'alarm_1']]
    dataset_x = p.to_numpy()
    dataset_x = normalize(dataset_x)
    dataset_x = np.reshape(dataset_x, (1, 1, 10))
    prediction = model.predict(dataset_x, verbose=0)
    constant_data['prediction_energy_consumed'] = prediction.flatten()[0]

    # Call the function add_machine_state
    output_data['session'] = shift_name
    output_data['machine_state'] = add_machine_state(sensor_data, log_value['prev_machine_state'])

    # Call the function to add the part program
    output_data['part_program'] = classify_pp(pp_model, sensor_data['cycle_time'])

    output_data['predicted_alarm'] = 0

    # To be added to constant.txt
    if warning_prediction(log_value['prediction_energy_consumed'], normalize(sensor_data["power_avg"])):
        constant_data['number_alarm_triggered'] = log_value['number_alarm_triggered'] + 1
        if constant_data['number_alarm_triggered'] == 10:
            constant_data['number_alarm_triggered'] = 0
            output_data['predicted_alarm'] = 1
    else:
        constant_data['number_alarm_triggered'] = 0
    constant_data['row_current_shift'] = log_value['row_current_shift'] + 1
    constant_data['number_item_current'] = sensor_data['items'] + log_value['number_item_current']

    # The same that are saved in the DB
    constant_data['prev_machine_state'] = output_data['machine_state']
    constant_data['actual_shift'] = output_data['session']
    constant_data['actual_day'] = day
    for key, value in output_data.items():
        if key.startswith("incremental"):
            constant_data[key] = value

    modify_val(constant_data)
    # Saving the outputs
    complete_data = output_data.copy()
    complete_data.update(sensor_data.copy())
    val=complete_data.copy()
    
    query = "INSERT INTO processed_data (energy_cost, incremental_cycle_time_avg, incremental_energy_cost, \
            incremental_items_avg, incremental_power, incremental_power_avg, power_var, cycle_var, session, \
            machine_state, part_program, predicted_alarm, cycle_time, idle_time, working_time, power_working, items, \
            power_avg, power_idle, power_max, power_min, alarm_1, alarm_2, alarm_3, alarm_4, asset, ts) \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

    records = db.command(query, (val["energy_cost"], val["incremental_cycle_time_avg"], 
                                val["incremental_energy_cost"], val["incremental_items_avg"], 
                                val["incremental_power"], val["incremental_power_avg"], 
                                val["power_var"], val["cycle_var"], val["session"], 
                                val["machine_state"], val["part_program"], val["predicted_alarm"], 
                                val["cycle_time"], val["idle_time"], val["working_time"], 
                                val["power_working"], val["items"], val["power_avg"], 
                                val["power_idle"], val["power_max"], val["power_min"], 
                                val["alarm_1"], val["alarm_2"], val["alarm_3"], 
                                val["alarm_4"], val["asset"], val["ts"]))

    if str(records).upper() == "ERROR":
       print('errore')
       break


    time.sleep(20)

