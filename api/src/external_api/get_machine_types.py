from flask import Blueprint, jsonify, request

from DatabaseManager import DatabaseManager
db = DatabaseManager()

from utilities.utilities import checkvalue, convert_to_json, check_params

get_machine_types_app = Blueprint('get_machine_types_app', __name__)

@get_machine_types_app.route('/get_machine_types', methods=['GET'])
def get_machine_types():
    query = "SELECT * FROM machine_types;"

    records = db.query(query)

    if str(records).upper() != "ERROR":
        response = jsonify(records)
        response.status_code = 200
    else:
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response
