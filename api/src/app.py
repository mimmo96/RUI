import logging
import os
from flask import Flask

logging.basicConfig(level=logging.DEBUG)
secret_key = os.urandom(24).hex()

#communication = CommunicationManager()

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

if __name__ == '__main__':
    import time
    time.sleep(5) # Time to start the db

    app.run(debug=True, host='0.0.0.0')

    from external_api.test_post import test_post_app
    app.register_blueprint(test_post_app)

    from external_api.get_data_range import get_data_range_app
    app.register_blueprint(get_data_range_app)

    from external_api.get_data_start import get_data_start_app
    app.register_blueprint(get_data_start_app)

    from external_api.get_real_time_data import get_real_time_data_app
    app.register_blueprint(get_real_time_data_app)

    from external_api.get_last_data import get_last_data_app
    app.register_blueprint(get_last_data_app)

    print("mammt")
    
    