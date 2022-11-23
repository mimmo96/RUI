from flask import Blueprint, jsonify, request

from utilities.utilities import checkvalue, convert_to_json, check_params
from DatabaseManager import DatabaseManager
db = DatabaseManager()

get_data_part_program_app = Blueprint('get_data_part_program_app', __name__)

@get_data_part_program_app.route('/get_data_part_program', methods=['GET'])
def get_data_part_program():
    params_list = [ "start_date", "end_date"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    start_date = str(values['start_date'])
    end_date = str(values['end_date'])

    query = "SELECT * FROM grouped_pp WHERE ts >= %s AND ts < %s ORDER BY ts;"

    records = db.query(query, (start_date, end_date))

    if str(records).upper() != "ERROR":
        data = [{"ts": a, "session": b, "part_program": d, "power_total": e, "power_mean":f, "power_var":g, "item_total":h, 
                "cycle_time_total":i, "cycle_time_mean":l, "cycle_time_var":m, "asset": n, "energy_cost_avg": o
                    } for a, b, d, e, f, g, h, i, l, m, n, o in records]
        response = jsonify(data)
        response.status_code = 200
    else:
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response