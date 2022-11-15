from flask import Blueprint, jsonify, request

from DatabaseManager import DatabaseManager
db = DatabaseManager()

from utilities.utilities import checkvalue, convert_to_json, check_params

get_machines_app = Blueprint('get_machines_app', __name__)

@get_machines_app.route('/get_machines')
def get_machines():
    query = "SELECT * FROM machines;"

    cursor = db.get_cursor()

    try:
        cursor.execute(query)
        records = cursor.fetchall()
        cursor.close()
    except:
        # If format is malformed or query doesn't end correctly
        cursor.close()
        response = jsonify(['Bad request!'])
        response.status_code = 400
        return response

    response = jsonify(convert_to_json(records))
    response.status_code = 200

    return response
