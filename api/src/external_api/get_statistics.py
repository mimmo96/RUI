from flask import Blueprint, jsonify, request, Response
import pandas as pd

statistics_from_ml_app = Blueprint('statistics_from_ml_app', __name__)

from DatabaseManager import DatabaseManager
from machine_learning.api_def import get_statistics
from utilities.utilities import check_params, convert_to_json

db = DatabaseManager()


@statistics_from_ml_app.route('/get_statistics', methods=['GET'])
def get_test():
    params_list = ["asset", "start_date", "end_date", "part_program", "num_items"]
    valid_parameters, values = check_params(request, params_list)

    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    asset = str(values['asset'])
    start_date = pd.to_datetime(str(values['start_date']))
    end_date = pd.to_datetime(str(values['end_date']))
    part_program = int(values['part_program'])
    num_items = int(values['num_items'])

    # get data from db
    query = "SELECT * FROM machine_data WHERE asset LIKE %s AND part_program = %s AND" \
            " ts >= %s AND ts < %s ORDER BY ts;"
    records = db.query(query, (asset, part_program, start_date, end_date))

    if records != 'ERROR':
        df = pd.DataFrame(records, columns=['session', 'part_program', 'incremental_power_avg', 'incremental_items_avg',
                                            'incremental_cycle_time_avg', 'incremental_power',
                                            'incremental_energy_cost', 'power_var', 'cycle_var', 'asset', 'items',
                                            'working_time', 'idle_time', 'power_avg', 'power_min', 'power_max',
                                            'power_working', 'power_idle', 'cycle_time', 'alarm_1', 'alarm_2',
                                            'alarm_3', 'alarm_4', 'predicted_alarm', 'ts', 'energy_cost'
                                            ])
        result = get_statistics(df, part_program, num_items)

        response = Response(result,  mimetype='application/json')
        response.status_code = 200
        return response
    else:
        # If format is malformed or query doesn't end correctly
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response
