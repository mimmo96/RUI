from flask import Blueprint, jsonify, request

from DatabaseManager import DatabaseManager
db = DatabaseManager()

from utilities.utilities import checkvalue, convert_to_json, check_params

get_part_programs_app = Blueprint('get_part_programs_app', __name__)

@get_part_programs_app.route('/get_part_programs')
def get_part_programs():
    params_list = ["asset"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    asset = str(values['asset'])

    query = "SELECT * FROM part_programs WHERE machine_asset LIKE %s;"

    records = db.query(query, (asset,))

    if str(records).upper() != "ERROR":
        response = jsonify(records)
        response.status_code = 200
    else:
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response
