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


def get_statistics(start: dt, end: dt, part_program: str, asset: str, num_items: int ):
  
  return [ 
            {"Stats":"mean","items_min":2.9983193277,"pow_work_item":809.4861690011,"pow_idle_item":0.0,"pow_avg_item":808.8481652661,"pow_max_item":3774.4410784314,"pow_min_item":94.4581938375},
            {"Stats":"std","items_min":0.0579771036,"pow_work_item":59.9560920919,"pow_idle_item":0.0,"pow_avg_item":42.8009710656,"pow_max_item":354.2711525155,"pow_min_item":9.2896743181},
            {"Stats":"min","items_min":1.0,"pow_work_item":691.268,"pow_idle_item":0.0,"pow_avg_item":691.27,"pow_max_item":2745.67,"pow_min_item":81.67},
            {"Stats":"25%","items_min":3.0,"pow_work_item":787.3575,"pow_idle_item":0.0,"pow_avg_item":787.3566666667,"pow_max_item":3570.1333333333,"pow_min_item":89.448},
            {"Stats":"50%","items_min":3.0,"pow_work_item":809.812,"pow_idle_item":0.0,"pow_avg_item":809.8116666667,"pow_max_item":3706.2666666667,"pow_min_item":93.3373333333},
            {"Stats":"75%","items_min":3.0,"pow_work_item":827.59,"pow_idle_item":0.0,"pow_avg_item":827.59,"pow_max_item":3993.0916666667,"pow_min_item":97.2263333333},
            {"Stats":"max","items_min":3.0,"pow_work_item":2576.178,"pow_idle_item":0.0,"pow_avg_item":1822.18,"pow_max_item":10920.5,"pow_min_item":326.68},
            {"Stats":"pow_work_item","mean":80948.6169001121},
            {"Stats":"pow_idle_item","mean":0.0},
            {"Stats":"pow_avg_item","mean":80884.8165266106},
            {"Stats":"minutes","mean":33.3520179372}     
    ]

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