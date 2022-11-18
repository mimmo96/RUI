from flask import Blueprint, jsonify, request

from DatabaseManager import DatabaseManager

db = DatabaseManager()

from utilities.utilities import checkvalue, convert_to_json, check_params

save_machine_type_app = Blueprint('save_machine_type_app', __name__)


@save_machine_type_app.route('/save_machine_type')
def save_machine_type():
    params_list = ["machine_type"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    machine_type = str(values['machine_type'])

    query = "SELECT * FROM machine_types WHERE name LIKE %s;"

    records = db.query(query, (machine_type,))

    if str(records).upper() == "ERROR":
        response = jsonify(['Bad request!'])
        response.status_code = 400
        return response

    if not len(records):
        query = "INSERT INTO machine_types (name) VALUES (%s) RETURNING id;"

        records = db.command(query, (machine_type,), fetch=True)

        if str(records).upper() != "ERROR":
            response = jsonify({'id': records})
            response.status_code = 200
        else:
            response = jsonify(['Bad request!'])
            response.status_code = 400

    else:
        response = jsonify(['Machine type already present in DB'])
        response.status_code = 400

    return response
