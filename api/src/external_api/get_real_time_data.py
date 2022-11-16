from flask import Blueprint, jsonify, request

from utilities.utilities import checkvalue, convert_to_json,check_params

get_real_time_data_app = Blueprint('get_real_time_data_app', __name__)

from DatabaseManager import DatabaseManager
db = DatabaseManager()

# /get_real_time_data?asset=P01&index=5
@get_real_time_data_app.route('/get_real_time_data', methods=['GET'])
def get_real_time_data():
    valid_parameters, values = check_params(request, ["asset", "index"])
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    asset = str(values["asset"])
    index = str(values["index"])

    query = "SELECT * FROM machine_data WHERE asset=%s LIMIT 1 OFFSET %s;"

    records = db.query(query, (asset, index))

    if str(records).upper() != "ERROR":
        response = jsonify(records)
        response.status_code = 200
    else:
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response
