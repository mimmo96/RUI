from flask import Blueprint, jsonify, request, Response
import pandas as pd

get_last_row_app = Blueprint('get_last_row_app', __name__)

from DatabaseManager import DatabaseManager
#from machine_learning.api_def import get_statistics  qui è da mettere il file
from utilities.utilities import check_params, convert_to_json

db = DatabaseManager()

@get_last_row_app.route('/get_last_row', methods=['GET'])
def get_last_row():
   
    # get data from db
    query = "SELECT * FROM processed_data ORDER by ts DESC LIMIT 1;"
    
    records = db.query(query, )

    if records != 'ERROR':
        response = jsonify(records)
        response.status_code = 200
    else:
        # If format is malformed or query doesn't end correctly
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response
