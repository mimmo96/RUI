from flask import Blueprint, jsonify, request
from utilities.utilities import checkvalue, convert_to_json,check_params

from DatabaseManager import DatabaseManager
db = DatabaseManager()

get_data_from_last_session_app = Blueprint('get_data_from_last_session_app', __name__)

# get last n value from database
@get_data_from_last_session_app.route('/get_data_from_last_session', methods=['GET'])
def get_data_from_last_session():
    # get data from db

    #----------- modificare questa query in modo da prendere i dati di tutta l'ultima sessione
    query = "SELECT * FROM processed_data;"
    #------------------------------------------------------
    records = db.query(query, )

    if records != 'ERROR':
        response = jsonify(records)
        response.status_code = 200
    else:
        # If format is malformed or query doesn't end correctly
        response = jsonify(['Bad request!'])
        response.status_code = 400

    return response