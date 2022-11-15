from flask import Blueprint, jsonify, request

test_post_app = Blueprint('test_post_app', __name__)

@test_post_app.route('/testpost', methods=['POST'])
def testpost():
    data = request.get_json(force=True, silent=True, cache=False)  # for get json data
    print(data)

    response = jsonify(data)
    response.status_code = 201  # or 400 or whatever

    return response

@test_post_app.route('/test', methods=['GET'])
def testget():
    return "Hello world!"

