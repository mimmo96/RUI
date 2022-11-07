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

def checkvalue(value):
    emptyvalues = ["", "''", " ", "' '", None, '""', '" "']
    
    if(value in emptyvalues):
        return False

    return True

def convert_to_json(values):
    data = [{"ts": a, "asset": b, "items": c, 
            "working_time": d, "idle_time": e, "power_avg": f,
            "power_min": g, "power_max": h, "power_working": i,
            "power_idle": l, "cycle_time": m, "alarm_1": n,
            "alarm_2": o, "alarm_3": p, "alarm_4": q} for a, b ,c, d, e, f , g, h, i, l ,m, n, o, p ,q in values]
    
    return data

@app.route('/')
def hello_world():
    return 'Welcome to RUI application!</a>'

@app.route('/testpost', methods=['POST'])
def testpost():

    data = request.get_json(force=True, silent=True, cache=False) #for get json data
    print(data)

    response = jsonify(data)
    response.status_code = 201 # or 400 or whatever

    return response
    

@app.route('/get_data', methods=['GET'])
def get_data():
    res = db.get_data()
    
    response = jsonify(res)
    response.status_code = 201 # or 400 or whatever

    return response


# get last n value from database
@app.route('/get_last_data', methods=['GET'])
def get_last_data():

    last = request.args.get('n')
    if(not checkvalue(last)):
        response = jsonify(['bad request!'])
        response.status_code = 400

        return response

    #get value from db
    query = "SELECT * FROM machine_data ORDER BY ts DESC LIMIT " +str(last)
    cursor = db.get_cursor()
    cursor.execute(query)

    # Fetch result
    records = cursor.fetchall()

    response = jsonify(convert_to_json(records))
    response.status_code = 200

    return response


#/get_real_time_data?asset=P01&index=5
@app.route('/get_real_time_data', methods=['GET'])
def get_real_time_data():
    asset = request.args.get('asset')
    index = request.args.get('index')
    
    if(not checkvalue(asset) or not checkvalue(index) ):
        response = jsonify(['bad request!'])
        response.status_code = 400

        return response
    
    #get value from db

    query = "SELECT * FROM machine_data WHERE asset='"+asset+"'" + "LIMIT 1 OFFSET " + str(index)
    cursor = db.get_cursor()
    cursor.execute(query)

    # Fetch result
    records = cursor.fetchall()

    response = jsonify(convert_to_json(records))
    response.status_code = 200

    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
