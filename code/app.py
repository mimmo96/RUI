import logging
import os
import json
import DatabaseManager

from flask import Flask, g

logging.basicConfig(level=logging.DEBUG)
secret_key = os.urandom(24).hex()  

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Welcome anon 2</a>'

@app.route('/pippo')
def pippo():
    return 'ciao pippo'\

@app.route('/tmp_mysql')
def pippone():
    return 'ciao pippo'+DatabaseManager.test_connection()

if __name__ == '__main__':
    print( DatabaseManager.test_connection() )

    app.run(debug=True, host='0.0.0.0')
