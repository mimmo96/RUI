
def checkvalue(value: str) -> bool:
    if value is None:
        return False

    value = value.strip()
    emptyvalues = ["", "''", " ", "' '", '""', '" "']

    if value in emptyvalues:
        return False

    return True

def convert_to_json(values):
    data = [{"ts": a, "asset": b, "items": c,
             "working_time": d, "idle_time": e, "power_avg": f,
             "power_min": g, "power_max": h, "power_working": i,
             "power_idle": l, "cycle_time": m, "alarm_1": n,
             "alarm_2": o, "alarm_3": p, "alarm_4": q} for a, b, c, d, e, f, g, h, i, l, m, n, o, p, q in values]

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