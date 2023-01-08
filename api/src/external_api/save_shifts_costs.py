from flask import Blueprint, jsonify, request
import datetime as dt

from DatabaseManager import DatabaseManager

db = DatabaseManager()

from utilities.utilities import checkvalue, convert_to_json, check_params

save_shifts_costs_app = Blueprint('save_shifts_costs_app', __name__)

@save_shifts_costs_app.route('/save_shifts_costs', methods=['POST'])
def save_shifts_costs():
    params_list = ["shift_name", "shift_start", "shift_end", "shift_cost"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    shift_name = str(values['shift_name'])
    # Convert to timestamp and concatenate time (HH:MM)
    shift_start = "1970-01-01T"+str(values['shift_start'])
    shift_end = "1970-01-01T"+str(values['shift_end'])
    if str(values['shift_cost']):
        shift_cost = str(values['shift_cost'])
    else:
        shift_cost = 0.0

    # Check if shift with that name already exists 
    query = "SELECT * FROM shifts_costs WHERE shift_name LIKE %s;"

    records = db.query(query, (shift_name,))

    if str(records).upper() == "ERROR":
        response = jsonify(['Bad request!'])
        response.status_code = 400
        return response

    #conto i risultati restituiti, se non ce ne sono lo inserisco, se ne esiste almeno uno faccio UPDATE
    if len(records) == 1:
        query = "UPDATE shifts_costs SET shift_start=%s, shift_end=%s, shift_cost=%s WHERE shift_name=%s;"

        records = db.command(query, (dt.datetime.strptime(shift_start, '%Y-%m-%dT%H:%M'),
                                 dt.datetime.strptime(shift_end, '%Y-%m-%dT%H:%M'), shift_cost,shift_name))

        if str(records).upper() != "ERROR":
            response = jsonify(['Data correctly saved into DB'])
            response.status_code = 200
        else:
            response = jsonify(['Bad !'])
            response.status_code = 400
        return response
    

    query = "INSERT INTO shifts_costs (shift_name, shift_start, shift_end, shift_cost) VALUES (%s, %s, %s, %s)"
    records = db.command(query, (shift_name, dt.datetime.strptime(shift_start, '%Y-%m-%dT%H:%M'),
                                 dt.datetime.strptime(shift_end, '%Y-%m-%dT%H:%M'), shift_cost,))

    if str(records).upper() != "ERROR":
        response = jsonify(['Data correctly saved into DB'])
        response.status_code = 200
    else:
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response
