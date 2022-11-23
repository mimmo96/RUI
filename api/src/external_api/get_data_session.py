from flask import Blueprint, jsonify, request

from utilities.utilities import checkvalue, convert_to_json, check_params
from DatabaseManager import DatabaseManager
db = DatabaseManager()

get_data_session_app = Blueprint('get_data_session_app', __name__)

@get_data_session_app.route('/get_data_session', methods=['GET'])
def get_data_session():
    params_list = [ "start_date", "end_date"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    start_date = str(values['start_date'])
    end_date = str(values['end_date'])

    query = "SELECT * FROM grouped_session WHERE ts >= %s AND ts < %s ORDER BY ts;"

    records = db.query(query, (start_date, end_date))

    if str(records).upper() != "ERROR":
        data = [{"ts": a, "session": b, "power_total": d, "power_mean": e, "power_var":f, "item_total":g, "n_interval_idle":h, 
                "n_interval_working":i, "n_interval_alarm":l, "tot_state_change":m, "perc_state_idle": n, "perc_state_working": o,
                "perc_state_alarm":p , "asset":q , "energy_cost_avg":r
                    } for a, b, d, e, f, g, h, i, l, m, n, o, p, q, r in records]
        response = jsonify(data)
        response.status_code = 200
    else:
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response