from flask import Blueprint, jsonify, request

from utilities.utilities import checkvalue, convert_to_json, check_params
from DatabaseManager import DatabaseManager
db = DatabaseManager()

get_date_range_from_processed_data_app = Blueprint('get_date_range_from_processed_data_app', __name__)

@get_date_range_from_processed_data_app.route('/get_date_range_from_processed_data', methods=['GET'])
def get_date_range_from_processed_data():
    params_list = ["start_date", "end_date"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    start_date = str(values['start_date'])
    end_date = str(values['end_date'])

    query = "SELECT * FROM processed_data_full WHERE ts >= %s AND ts < %s ORDER BY ts;"

    records = db.query(query, (start_date, end_date))

    if str(records).upper() != "ERROR":
        response = jsonify(convert_to_json(records))
        response.status_code = 200
    else:
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response