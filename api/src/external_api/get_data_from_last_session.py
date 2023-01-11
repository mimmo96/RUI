from flask import Blueprint, jsonify, request
from utilities.utilities import checkvalue, convert_to_json,check_params

from DatabaseManager import DatabaseManager
db = DatabaseManager()

get_data_from_last_session_app = Blueprint('get_data_from_last_session_app', __name__)

# get last n value from database
@get_data_from_last_session_app.route('/get_data_from_last_session', methods=['GET'])
def get_data_from_last_session():
    # get data from db

    #----------- modificare questa query in modo da prendere i dati di tutta l'ultima sessione
    query = "SELECT * FROM processed_data where date(ts) = (SELECT date(ts) FROM processed_data \
             ORDER BY 'ts' asc LIMIT 1)  AND session = (SELECT session FROM processed_data  LIMIT 1) LIMIT 1 ;  "
    #------------------------------------------------------
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