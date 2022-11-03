import logging
import os
import json

from flask import Flask, request, jsonify

from DatabaseManager import DatabaseManager

logging.basicConfig(level=logging.DEBUG)
secret_key = os.urandom(24).hex()

db = DatabaseManager()

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

@app.route('/')
def hello_world():
    return 'Welcome to RUI application!</a>'

@app.route('/testpost', methods=['POST'])
def testpost():
    #name = request.args.get('name')
    #surname = request.args.get('surname')
    #age = request.args.get('age')
    data = request.get_json(force=True, silent=True, cache=False) #for get json data
    print(data)
    #data = [name,surname,age]

    response = jsonify(data)
    response.status_code = 201 # or 400 or whatever

    return response
    

@app.route('/get_data', methods=['GET'])
def get_data():
    res = db.get_data()
    
    response = jsonify(res)
    response.status_code = 201 # or 400 or whatever

    return response

@app.route('/testget', methods=['GET'])
def gestget():

    #qui facciamo le query al db per prenderci i dati e restituirli in formato json

    data = ['Meret', 'Di Lorenzo', 'Minjae', 'Jesus', 'Mario Rui', 'Anguissa', 'Lobotka', 'Zielinski', 'Lozano', 'Osimhen', 'Kvaratskhelia']

    response = jsonify(data)
    response.status_code = 200 # or 400 or whatever
    
    return response


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
