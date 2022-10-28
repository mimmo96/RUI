import logging
import os
import json

from flask import Flask, g

logging.basicConfig(level=logging.DEBUG)
secret_key = os.urandom(24).hex()  

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Welcome anon 2</a>'


@app.route('/pippo')
def pippo():
    return 'ciao pippo'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
