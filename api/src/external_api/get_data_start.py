from flask import Blueprint, jsonify, request

from DatabaseManager import DatabaseManager
db = DatabaseManager()

from utilities.utilities import checkvalue, convert_to_json, check_params

get_data_start_app = Blueprint('get_data_start_app', __name__)

@get_data_start_app.route('/get_data_start')
def get_data_start():
    params_list = ["asset", "start_date"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    asset = str(values['asset'])
    start_date = str(values['start_date'])

    query = "SELECT * FROM machine_data WHERE asset LIKE '" + str(asset) +\
            "' AND ts >= '" + str(start_date) + "';"

    cursor = db.get_cursor()

    try:
        cursor.execute(query)
        records = cursor.fetchall()
        cursor.close()
    except:
        # If format is malformed or query doesn't end correctly
        response = jsonify(['Bad request!'])
        response.status_code = 400
        return response

    response = jsonify(convert_to_json(records))
    response.status_code = 200

    return response
