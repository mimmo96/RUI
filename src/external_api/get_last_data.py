from flask import Blueprint, jsonify, request
from utilities.utilities import checkvalue, convert_to_json,check_params

from DatabaseManager import DatabaseManager
db = DatabaseManager()

get_last_data_app = Blueprint('get_last_data_app', __name__)

# get last n value from database
@get_last_data_app.route('/get_last_data', methods=['GET'])
def get_last_data():
    params_list = ["n", "asset"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    last = str(values['n'])
    asset = str(values['asset'])

    # get value from db
    query = "SELECT * FROM machine_data WHERE asset LIKE '" + str(asset) + \
            "' ORDER BY ts DESC LIMIT " +str(last)
    response = db.query_db(query)

    return response