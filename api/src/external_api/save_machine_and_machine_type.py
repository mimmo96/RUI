from flask import Blueprint, jsonify, request

from utilities.utilities import checkvalue, convert_to_json, check_params

from DatabaseManager import DatabaseManager
db = DatabaseManager()

save_machine_and_machinetype_app = Blueprint('save_machine_and_machinetype_app', __name__)
@save_machine_and_machinetype_app.route('/save_machine_and_machine_type', methods=['GET'])
def save_machine_and_machine_type():
    global response
    params_list = ["asset", "machine_type"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    asset = str(values['asset'])
    machine_type = str(values['machine_type'])

    query = "SELECT * FROM machine_types WHERE name LIKE %s;"

    records = db.query(query, (machine_type,))

    if str(records).upper() == "ERROR":
        response = jsonify(['Bad request! 1'])
        response.status_code = 400
        return response

    if not len(records):
        query = "INSERT INTO machine_types (name) VALUES (%s) RETURNING id;"

        records = db.command(query, (machine_type,), fetch=True)

        id = records
        if str(records).upper() == "ERROR":
            response = jsonify(['Bad request! 2'])
            response.status_code = 400
            return response
    else:
        id = records[0][1]
    ## Fase 2

    query = "SELECT * FROM machines WHERE asset LIKE %s;"

    records = db.query(query, (asset,))

    if str(records).upper() == "ERROR":
        response = jsonify(['Bad request! 3'])
        response.status_code = 400
        return response

    if not len(records):
        query = "INSERT INTO machines (machine_type, asset) VALUES (%s, %s);"

        records = db.command(query, (id, asset))

        if str(records).upper() == "ERROR":
            response = jsonify(['Bad request! 4'])
            response.status_code = 400
            return response

    else:
        response = jsonify(['Asset already present in DB'])
        response.status_code = 400




    response = jsonify(['Machine and machine type saved successfully'])
    response.status_code = 201
    return response
