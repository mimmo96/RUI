from flask import Blueprint, jsonify, request, Response
import pandas as pd

get_last_row_app = Blueprint('get_last_row_app', __name__)

from DatabaseManager import DatabaseManager
#from machine_learning.api_def import get_statistics  qui è da mettere il file
from utilities.utilities import check_params, convert_to_json

db = DatabaseManager()

@get_last_row_app.route('/get_last_row', methods=['GET'])
def get_last_row():
   
    # get data from db
    query = "SELECT * FROM processed_data ORDER by ts DESC LIMIT 1;"
    
    records = db.query(query, )

    if records != 'ERROR':
        response = jsonify(convert_to_json1(records))
        response.status_code = 200
    else:
        # If format is malformed or query doesn't end correctly
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response

def convert_to_json1(values):
      
    data = [{"session": session,
             "part_program": part_program,
             "incremental_power_avg": incremental_power_avg,
             "incremental_items_avg": incremental_items_avg,
             "incremental_cycle_time_avg": incremental_cycle_time_avg,
             "incremental_power": incremental_power,
             "incremental_energy_cost": incremental_energy_cost,
             "power_var": power_var,
             "cycle_var": cycle_var,
             "asset": asset,
             "items": items,
             "working_time": working_time,
             "idle_time": idle_time,
             "power_avg": power_avg,
             "power_min": power_min, "power_max": power_max, "power_working": power_working,
             "power_idle": power_idle, "cycle_time": cycle_time,
             "alarm_1": alarm_1,'alarm_2': alarm_2 ,'alarm_3': alarm_3 ,'alarm_4': alarm_4 ,
             'predicted_alarm': predicted_alarm ,
             'ts': ts,
             'energy_cost': energy_cost,
             'machine_state' : machine_state
             }
            for session, part_program,
                incremental_power_avg,
                incremental_items_avg,
                incremental_cycle_time_avg,
                incremental_power, incremental_energy_cost,
                power_var,
                cycle_var, asset,
                items, working_time,
                idle_time, power_avg,
                power_min, power_max,
                power_working, power_idle, cycle_time,
                alarm_1, alarm_2, alarm_3, alarm_4, predicted_alarm, ts, energy_cost,machine_state in values]

    return data