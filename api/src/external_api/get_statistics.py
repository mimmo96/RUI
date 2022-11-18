from flask import Blueprint, jsonify, request
import pandas as pd
statistics_from_ml_app = Blueprint('statistics_from_ml_app', __name__)

from DatabaseManager import DatabaseManager
from machine_learning.api_def import get_statistics
from utilities.utilities import check_params

db = DatabaseManager()

@statistics_from_ml_app.route('/get_statistics', methods=['GET'])
def get_test():

    params_list = ["asset", "start_date", "end_date", "part_program", "num_items"]
    valid_parameters, values = check_params(request, params_list)
    
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    try:
        asset = str(values['asset'])
        start_date = pd.to_datetime(str(values['start_date']))
        end_date = pd.to_datetime(str(values['end_date']))
        part_program = str(values['part_program'])
        num_items = int(values['num_items'])

        response = jsonify(get_statistics(start_date, end_date, part_program,asset,num_items))
        response.status_code = 200

    except:
        # If format is malformed or query doesn't end correctly
        response = jsonify(['Bad request!'])
        response.status_code = 400
        return response

    return response
