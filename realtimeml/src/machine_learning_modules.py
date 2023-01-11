import numpy as np


def add_machine_state(curr, prev_state):
    if curr['working_time'] > 0 and curr['idle_time'] > 0 and \
            curr['alarm_1'] > 0:  # abbiamo sia working che idle che alarm
        if prev_state == 0:  # idle -> working or alarm? alarm (Caso molto difficile che accada)
            prev_state = 2
        elif prev_state == 1:  # working->idle or alarm? alarm!
            prev_state = 2
        else:  # alarm->working or idle? working!
            prev_state = 1
    elif curr['working_time'] > 0 and curr['idle_time'] > 0:  # abbiamo sia working che idle ma non alarm
        if prev_state == 0:  # idle-> working
            prev_state = 1
        elif prev_state == 1:  # working->idle
            prev_state = 0
        else:  # era in alarm, passiamo in working, idle era relativo all'alarm
            prev_state = 1
    elif curr['working_time'] > 0 and curr['alarm_1'] > 0:
        if prev_state == 0:  # idle->working
            prev_state = 1
        elif prev_state == 1:  # working->alarm
            prev_state = 2
        else:  # alarm->working (Non puo' succedere a regola)
            prev_state = 1
    elif curr['working_time'] > 0:  # Abbiamo solo working time
        if prev_state == 0:  # idle->working
            prev_state = 1
        elif prev_state == 1:  # working->working
            prev_state = 1
            pass
        else:  # alarm->working
            prev_state = 1
            pass
    elif curr['alarm_1'] > 0:  # Abbiamo solo alarm time
        if prev_state == 0:  # idle-> idle se avviene un alarm in idle rimaniamo in idle
            pass
        else:  # working V alarm-> alarm
            prev_state = 2
    else:  # abbiamo solo idle time
        if (prev_state == 2 and ((curr['ts'].hour <= 6) or (
                curr['ts'].hour >= 21))):  # siamo in alarm dopo le 21 e prima delle 6 alarm->idle
            prev_state = 0
        elif prev_state == 2:  # alarm->alarm
            pass
        elif prev_state == 1:  # working->idle
            prev_state = 0
        else:  # idle->idle
            pass
    return prev_state


def classify_pp(model, value):
    for pp, t in enumerate(model['splits']):
        if value < t:
            return pp
    return -1


def normalize(data):
    data = data - 556.7097442631564
    data = data / np.sqrt(3169070.190238107)
    return data


def inv_normalize(data):
    data = data * np.sqrt(3169070.190238107)
    data = data + 556.7097442631564
    return data


def warning_prediction(prediction, target, threshold=0.9):
    d = abs(target - prediction)
    return d > threshold
