
def checkvalue(value: str) -> bool:
    if value is None:
        return False

    value = value.strip()
    emptyvalues = ["", "''", " ", "' '", '""', '" "']

    if value in emptyvalues:
        return False

    return True

def convert_to_json(values):
  
    data = [{"session": a, "part_program": b, "incremental_power_avg": c,
             "incremental_items_avg": d, "incremental_cycle_time_avg": e, "power_var": f,
             "cycle_var": g, "asset": h, "items": i,
             "working_time": l, "idle_time": m, "power_avg": n,
             "power_min": o, "power_max": p, "power_working": q, "power_idle": r, "cycle_time": s,
             "alarm_1": t,'alarm_2': u ,'alarm_3': v ,'alarm_4': w ,'part_program_y': x ,'predicted_alarm': y ,'ts': z} for a, b, c, d, e, f, g, h, i, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z in values]

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