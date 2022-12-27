from flask import Blueprint, jsonify, request

from DatabaseManager import DatabaseManager
db = DatabaseManager()

from utilities.utilities import checkvalue, convert_to_json, check_params

get_shifts_app = Blueprint('get_shifts_app', __name__)

@get_shifts_app.route('/get_shifts', methods=['GET'])
def get_shifts():
    query = "SELECT * FROM shifts_costs;"

    records = db.query(query)

    if str(records).upper() != "ERROR":
        data = [{"shift_name": shift_name, "shift_start": shift_start,
                 "shift_end": shift_end, "shift_cost": shift_cost}
                for shift_name, shift_start, shift_end, shift_cost in records]
        response = jsonify(data)
        response.status_code = 200
    else:
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response
