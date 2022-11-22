from flask import Blueprint, jsonify, request

from DatabaseManager import DatabaseManager
db = DatabaseManager()

from utilities.utilities import checkvalue, convert_to_json, check_params

get_machines_app = Blueprint('get_machines_app', __name__)

@get_machines_app.route('/get_machines', methods=['GET'])
def get_machines():
    query = "SELECT * FROM machines;"

    records = db.query(query)

    if str(records).upper() != "ERROR":
        response = jsonify(convert_to_json(records))
        response.status_code = 200
    else:
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response