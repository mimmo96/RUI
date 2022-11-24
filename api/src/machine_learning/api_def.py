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


def get_statistics(df, part_program, num_items: int):
    # df = dataframe
    # pp = part program
    # items = items that Production manager wants to produce

    pp = part_program
    items = num_items

    dp = df[df['part_program'] == pp].copy()
    pred_df = pd.DataFrame()
    pred_df = pd.DataFrame(
        columns=['items_min', 'pow_work_item', 'pow_idle_item', 'pow_avg_item', 'pow_max_item', 'pow_min_item'])
    pred_df['items_min'] = dp['items']
    pred_df['pow_work_item'] = dp['power_working'] / dp['items']
    pred_df['pow_idle_item'] = dp['power_idle'] / dp['items']

    # calcolare questi valori dividendo per il numero di items forse non è corretto ?????
    pred_df['pow_avg_item'] = dp['power_avg'] / dp['items']
    pred_df['pow_max_item'] = dp['power_max'] / dp['items']
    pred_df['pow_min_item'] = dp['power_min'] / dp['items']

    pred_df['pow_work_item'] = pred_df['pow_work_item'].astype(float)
    pred_df['pow_idle_item'] = pred_df['pow_idle_item'].astype(float)
    pred_df['pow_avg_item'] = pred_df['pow_avg_item'].astype(float)
    pred_df['pow_max_item'] = pred_df['pow_max_item'].astype(float)
    pred_df['pow_min_item'] = pred_df['pow_min_item'].astype(float)

    stats = pd.DataFrame(pred_df.describe())
    stats.drop(index=('count'), inplace=True)

    consumes = stats.copy()
    consumes = pd.DataFrame(stats.loc['mean'])
    consumes = consumes.loc[['pow_work_item', 'pow_idle_item', 'pow_avg_item']]
    consumes['mean'] = consumes['mean'] * items
    consumes.loc['minutes'] = items / stats['items_min']
    stats.reset_index(inplace=True)
    stats = stats.rename(columns={'index': 'Stats'})
    consumes.reset_index(inplace=True)
    consumes = consumes.rename(columns={'index': 'Stats'})

    output = pd.DataFrame(stats[['Stats', 'pow_work_item', 'pow_avg_item']]).set_index('Stats')
    output['minutes'] = (items/stats['items_min']).iloc[:].values
    output = output.to_json()

    return output




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
            'message': 'https://www.youtube.com/watch?v=zB_q1I0leoI', 'ts': dt.now()
        },
    ]
