import logging
import os
from flask import Flask
print("=== STARTING api/src/app.py ===")
import time
time.sleep(10)  # Time to start the db

logging.basicConfig(level=logging.DEBUG)
secret_key = os.urandom(24).hex()

#communication = CommunicationManager()

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

from external_api.get_data_range import get_data_range_app
app.register_blueprint(get_data_range_app)

from external_api.get_data_start import get_data_start_app
app.register_blueprint(get_data_start_app)

from external_api.get_real_time_data import get_real_time_data_app
app.register_blueprint(get_real_time_data_app)

from external_api.get_last_data import get_last_data_app
app.register_blueprint(get_last_data_app)

from external_api.test_post import test_post_app
app.register_blueprint(test_post_app)

from external_api.communication_apis import communication_app
app.register_blueprint(communication_app)

from external_api.get_messages_from_ml import messages_from_ml_app
app.register_blueprint(messages_from_ml_app)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    print("mammt")
    
    