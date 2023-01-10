# API
## Introduction
This is the base folder for the API service.
This service enables all the root for the API used by the frontend of RUI.

## Directory Structure

```
/src/
  |---/app.py
  |---/external_api/
               |---/myroute.py
               ---/...
               
  |---/***Manager.py
  
  |---/machine_learning/api_def.py
  
  |---utilities/
           |---/...
```

## app.py

The file app.py is where one starts from to understand this service.
In it you can find all the calls to register the flask blueprints defined in the `external_api` folder.

## external_api/

Here we find the blueprints of the api routes.
The main taks of these routes is to interact with the database through specific queries.

The following is the commented main code structure for a sample ``_myroute.py_'' route blueprint:

```
# define a new flask blueprint
myroute_app = Blueprint('myroute_app', __name__)
# match the blueprint to a specific API route
@get_data_start_app.route('/myroute')
# define the callback for the 
def myroute():
    # parse the parameters of the API request
    valid_parameters, values = check_params(request, ['param_1','param_2',...])
    # build the database query
    query = "SELECT * FROM machine_data WHERE asset LIKE %s AND ts >= %s ORDER BY ts;"
    # query the database
    response = db.query(query, ( str(values['param_1']), str(values['param_2']), ... ) )
    # return the response
    return jsonify(convert_to_json(response)
```

## ***Manager.py

These are specific modules used to add functinal blocks:

* `CommunicationManager.py` -  used to interact with the app
* `DatabaseManager.py` - used to interact with the database
* `RealTimeManager.py` - used for firebase notification system

## machine_learning

Running real time machine learning inference on the data stream

## Utilities

Utility function modules to sanitize requests etc.
