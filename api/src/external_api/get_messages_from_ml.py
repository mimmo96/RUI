from flask import Blueprint, jsonify, request

messages_from_ml_app = Blueprint('messages_from_ml_app', __name__)

from DatabaseManager import DatabaseManager
from machine_learning.api_def import fetch_messages_from_ml_module

db = DatabaseManager()


@messages_from_ml_app.route('/get_messages_from_ml', methods=['GET'])
def get_test():

    response = jsonify(fetch_messages_from_ml_module())
    response.status_code = 200

    return response
