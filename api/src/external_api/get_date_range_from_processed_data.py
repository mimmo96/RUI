from flask import Blueprint, jsonify, request

from utilities.utilities import check_params
from DatabaseManager import DatabaseManager
db = DatabaseManager()

get_date_range_from_processed_data_app = Blueprint('get_date_range_from_processed_data_app', __name__)

@get_date_range_from_processed_data_app.route('/get_date_range_from_processed_data', methods=['GET'])
def get_date_range_from_processed_data():
    params_list = ["start_date", "end_date"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    start_date = str(values['start_date'])
    end_date = str(values['end_date'])

    query = "SELECT * FROM processed_data_full WHERE ts >= %s AND ts < %s ORDER BY ts;"

    records = db.query(query, (start_date, end_date))

    if str(records).upper() != "ERROR":
        response = jsonify(convert_to_json1(records))
        response.status_code = 200
    else:
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