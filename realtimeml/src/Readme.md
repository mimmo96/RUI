# Realtime ML

This service has been built to make the whole system more compatible with the Zerynth API.

## Sensors Simulation

While before the time advance was regulated by the frontend, now we have a proper sensors simulation.

The simulator pushes new records from the sensors, adding one measurement at the time.

## ML

Now the machine learning module performs inference in real time using the pre trained models that are

| model | task                   | platform   | checkpoint                 |
|-------|------------------------|------------|----------------------------|
| LSTM  | energy prediction      | tensorflow | model/                     |
| GMM   | part program detection | sklearn    | trained_part_program.model |

## app.py

This is the main script performing the realtime sensors simulation and the the ML inference.

To control the frequency at which a new datapoint from the read from the sensor just changhe the delay value in seconds in the last line of the file

```
    time.sleep(20)
```

## constant.txt

This file specifies constants like thresholds, normalization etc.

The content is self-explainatory, but there is one warning about the formatting. The variable names have to be followed by exactly `: ` (one column and one space).
The space is mandatory, if omitted it will generate unpacking errors.

## other

other files and folders share common sense with the API docker, but have different code to adapt the dataset routes to the real time paradigm.
