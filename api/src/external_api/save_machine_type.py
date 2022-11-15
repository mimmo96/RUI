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

    query = "INSERT INTO machine_types (name) VALUES ('" + \
            machine_type + "') RETURNING id;"

    cursor = db.get_cursor()
    id = None

    try:
        cursor.execute(query)
        id = cursor.fetchone()[0]
        db.commit_changes()
        cursor.close()
    except:
        # If format is malformed or query doesn't end correctly
        cursor.close()
        response = jsonify(['Bad request!'])
        response.status_code = 400
        return response

    response = jsonify({'id': id})
    response.status_code = 200

    return response
