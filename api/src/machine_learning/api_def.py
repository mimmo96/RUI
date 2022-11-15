from datetime import datetime as dt
import pandas as pd

'''
Given a time interval and a part_program, compute statistics about the production in that time interval.
Part program is needed because energy and time to build may differ from pp to pp

:param dt start: when the input interval starts
:param dt end: when the input interval ends
:param int part_program: specification of part program.

:return: a dictionary with keys:
  - energy_per_item : mean energy required to build an item of type part_program
  - time_per_item: mean time required to build an item of type part_program
  - working_idle_ratio: percentage of time spent in working durign this session

'''


def get_statistics(start: dt, end: dt, part_program: int):
  return {
    'energy_per_item' : 1,
    'time_per_item': 1,
    'working_idle_ratio': 1,
  }

'''
Serve some new data to the ML module in form of a pandas DataFrame.
ML will process it and apply continual learning, but most important,
it will check the incoming data for anomalies. If anomalies are found,
this metod returns a non-empy array with messages from ML. The messages 
must be immediately passed to the Frontend to display them as notifications
for the production manager

:return: either an empty list (means everithing is fine) or a list 
of messages from the ML module, signaling anomalies found in the data.
'''
def give_new_data_to_ml(new_data: pd.DataFrame):
    
    # here we will process the new data

    return fetch_messages_from_ml_module()

'''
Very primitive method, just to Give the idea. Call to get messages from the ML team.
Messages are are just text with a timestamp (ts) to be sure you dont'display the same one
more than once
'''
def fetch_messages_from_ml_module():
  return [
    {
      'message':'https://www.youtube.com/watch?v=zB_q1I0leoI','ts': dt.now()
    },
  ]