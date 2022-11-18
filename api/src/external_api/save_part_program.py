from flask import Blueprint, jsonify, request

from DatabaseManager import DatabaseManager

db = DatabaseManager()

from utilities.utilities import checkvalue, convert_to_json, check_params

save_part_program_app = Blueprint('save_part_program_app', __name__)


@save_part_program_app.route('/save_part_program', methods=['POST'])
def save_part_program():
    params_list = ["asset", "part_program"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    asset = str(values['asset'])
    part_program = str(values['part_program'])

    query = "INSERT INTO part_programs (part_program, machine_asset) VALUES (%s, %s);"

    records = db.command(query, (part_program, asset))

    if str(records).upper() != "ERROR":
        response = jsonify(['Data correctly saved into DB'])
        response.status_code = 200
    else:
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response
