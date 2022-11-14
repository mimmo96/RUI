from flask import Blueprint, jsonify, request

from utilities.utilities import checkvalue, convert_to_json, check_params



communication_app = Blueprint('communication_app', __name__)

@communication_app.route('/broadcast', methods=['GET'])
def get_data_range():
    from CommunicationManager import CommunicationManager
    communication = CommunicationManager()

    params_list = ["message"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    message = str(values['message'])
    communication.send_broadcast_message(message)

    response = jsonify("Message sent")
    response.status_code = 200
    return response