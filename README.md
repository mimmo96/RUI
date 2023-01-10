# RUI

## Introduction

RUI is a web platform for IoT - AI - Industry 4.0 which is based on 3 docker containers.
This readme explains how to run the whole platform, to know more about the details, please make use of the individual readme files for each of the containers:
* [API](api/src/) (backend)
* [Web Interface](frontend/code/) (frontend)
* [Database](db/) (db)


## How to run

The docker containers are conveniently managed by docker compose, which makes it effortless to run the platform.

download Docker Desktop application - [Docker Desktop application](https://docs.docker.com/get-docker/) 

and run the command:
```
docker-compose up
```

when up, visit http://localhost:3000 .

Finally, to terminate the execution:

```
docker-compose down
```

## Ports and URLs

| API          | http://api:5000           |
|:------------:|:-------------------------:|
| **Database** | **http://db:5432**        |
| **Frontend** | **http://localhost:3000** |


## Branches

Currently the project is only using the _master_ branch

Note: the code is throughly commented.
