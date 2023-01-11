import requests
import json
import numpy as np


def modify_val(constants):
    # Open the file in write and read mode
    with open('constant.txt', 'w+') as file:
        # Iterate over the keys in the dictionary
        for key in constants:
            # Write the key-value pairs to the file
            file.write(f'{key}: {constants[key]}\n')


def read_log():
    constants = {}
    # Open the file in read mode
    with open('constant.txt', 'r') as file:
        # Iterate over the lines in the file
        for line in file:
            # Split the line into key-value pairs
            key, value = line.strip().split(': ')
            # If the key is "prev_machine_state", extract the value
            if key == 'actual_shift':
                constants[key] = value
            # If the key is "number_item_current", extract the value
            elif key == 'prediction_energy_consumed':
                constants[key] = float(value)
            elif key == 'power_var':
                constants[key] = float(value)
            elif key == 'cycle_var':
                constants[key] = float(value)
            elif key.startswith("incremental"):
                constants[key] = float(value)
            else:
                constants[key] = int(value)
    return constants


def request_sensor():
    url = "http://api:5000/get_data_range?asset=P01&start_date=2022-09-27 11:55&end_date=2022-10-14 23:59"

    r_data = requests.get(url=url)

    # extracting data in json format
    return json.loads(r_data.text)


def request_shift():
    url = "http://api:5000/get_shifts"
    r_shift = requests.get(url=url)
    return json.loads(r_shift.text)


def post_session(session_data):
    # TODO: Salvare i dati nella tabella delle sessioni
    pass

