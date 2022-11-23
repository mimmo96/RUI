
def checkvalue(value: str) -> bool:
    if value is None:
        return False

    value = value.strip()
    emptyvalues = ["", "''", " ", "' '", '""', '" "']

    if value in emptyvalues:
        return False

    return True

def convert_to_json(values):
  
    data = [{"session": session,
             "part_program": part_program,
             "incremental_power_avg": incremental_power_avg,
             "incremental_items_avg": incremental_items_avg,
             "incremental_cycle_time_avg": incremental_cycle_time_avg,
             "incremental_power": incremental_power,
             "incremental_energy_cost": incremental_energy_cost,
             "power_var": power_var,
             "cycle_var": cycle_var,
             "asset": asset,
             "items": items,
             "working_time": working_time,
             "idle_time": idle_time,
             "power_avg": power_avg,
             "power_min": power_min, "power_max": power_max, "power_working": power_working,
             "power_idle": power_idle, "cycle_time": cycle_time,
             "alarm_1": alarm_1,'alarm_2': alarm_2 ,'alarm_3': alarm_3 ,'alarm_4': alarm_4 ,
             'predicted_alarm': predicted_alarm ,
             'ts': ts,
             'energy_cost': energy_cost
             }
            for session, part_program,
                incremental_power_avg,
                incremental_items_avg,
                incremental_cycle_time_avg,
                incremental_power, incremental_energy_cost,
                power_var,
                cycle_var, asset,
                items, working_time,
                idle_time, power_avg,
                power_min, power_max,
                power_working, power_idle, cycle_time,
                alarm_1, alarm_2, alarm_3, alarm_4, predicted_alarm, ts, energy_cost in values]

    return data

def check_params(request, list_of_params):
    theMap = {}
    valid_params = True

    for param in list_of_params:
        value = request.values.get(param)
        is_the_param_valid = checkvalue(value)
        if not is_the_param_valid:
            valid_params = False
            break

        theMap[param] = value

    return valid_params,theMap




if __name__ == '__main__':
    print("checkvalue(''):",checkvalue('   '))