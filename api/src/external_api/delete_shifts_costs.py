from flask import Blueprint, jsonify, request

from utilities.utilities import checkvalue, convert_to_json, check_params
from DatabaseManager import DatabaseManager
db = DatabaseManager()


delete_shifts_costs_app = Blueprint('delete_shifts_costs_app', __name__)

@delete_shifts_costs_app.route('/delete_shifts_costs', methods=["DELETE"])
def delete_shifts_costs():
    params_list = ["shift_name"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    shift_name = str(values['shift_name'])
    
    # Check if shift with that name already exists 
    query = "SELECT * FROM shifts_costs WHERE shift_name LIKE %s;"

    records = db.query(query, (shift_name,))

    if str(records).upper() == "ERROR":
        response = jsonify(['Bad request!'])
        response.status_code = 400
        return response

    if len(records)>=1:
        # Check if shift with that name already exists 
        query = "DELETE FROM shifts_costs WHERE shift_name=%s;"

        db.query(query, (shift_name,))

        response = jsonify(['Data correctly deleted from DB'])
        response.status_code = 200
    else:
        response = jsonify(['Bad request!'])
        response.status_code = 400
        return response
        
    return response
