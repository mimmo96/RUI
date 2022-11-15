from flask import Blueprint, jsonify, request
import pandas as pd

new_data_to_ml_app = Blueprint('new_data_to_ml_app', __name__)

from DatabaseManager import DatabaseManager
from machine_learning.api_def import give_new_data_to_ml
from utilities.utilities import check_params

db = DatabaseManager()

@new_data_to_ml_app.route('/send_new_data', methods=['POST'])
def get_test():

    data = request.get_json(force=True, silent=True, cache=False)  # for get json data
    json_data = pd.DataFrame.from_dict(data, orient ='index')

    #manca il check del formato json ricevuto! e la gestione degli errori

    response = jsonify(give_new_data_to_ml(json_data))
    response.status_code = 200

    return response

