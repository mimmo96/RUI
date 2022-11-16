from flask import Blueprint, jsonify, request

from DatabaseManager import DatabaseManager
db = DatabaseManager()

from utilities.utilities import checkvalue, convert_to_json, check_params

save_machine_app = Blueprint('save_machine_app', __name__)

@save_machine_app.route('/save_machine')
def save_machine():
    params_list = ["asset", "machine_type"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    asset = str(values['asset'])
    machine_type = str(values['machine_type'])

    query = "SELECT * FROM machines WHERE asset LIKE %s;"

    records = db.query(query, (asset,))

    if str(records).upper() == "ERROR":
        response = jsonify(['Bad request!'])
        response.status_code = 400
        return response

    if not len(records):
        query = "INSERT INTO machines (machine_type, asset) VALUES (%s, %s);"

        records = db.command(query, (machine_type, asset))

        if str(records).upper() != "ERROR":
            response = jsonify(['Data correctly saved into DB'])
            response.status_code = 200
        else:
            response = jsonify(['Bad request!'])
            response.status_code = 400

    else:
        response = jsonify(['Asset already present in DB'])
        response.status_code = 400

    return response
