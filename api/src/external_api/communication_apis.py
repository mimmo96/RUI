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

@communication_app.route('/send_app_notification_workers', methods=['GET'])
def send_app_notification_workers():
    from CommunicationManager import CommunicationManager
    communication = CommunicationManager()

    params_list = ["message"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    message = str(values['message'])
    communication.send_broadcast_app_notifications_workers(message)

    response = jsonify("Message sent")
    response.status_code = 200
    return response

@communication_app.route('/send_notification_single_user', methods=['GET'])
def send_notification_single_user():
    from CommunicationManager import CommunicationManager
    communication = CommunicationManager()

    params_list = ["message","status","token"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    message = str(values['message'])
    status = str(values['status'])
    #img_url = str(values['img_url'])
    token = str(values['token']) # Mockare questo campo, se necessario
    communication.send_notification_single_user(message,status, None, token)

    response = jsonify("Message sent")
    response.status_code = 200
    return response

@communication_app.route('/add_task_worker', methods=['GET'])
def add_task_worker():
    from CommunicationManager import CommunicationManager
    communication = CommunicationManager()

    params_list = ["task_desc","worker"]
    valid_parameters, values = check_params(request, params_list)
    if not valid_parameters:
        response = jsonify(['Precondition failed: parameters are not valid'])
        response.status_code = 412
        return response

    task_desc = str(values['task_desc'])
    worker = str(values['worker'])
    communication.add_task(task_desc,worker)

    response = jsonify("Message sent")
    response.status_code = 200
    return response