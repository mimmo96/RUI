FROM postgres:15.1-alpine

COPY sql/init.sql /docker-entrypoint-initdb.d/

RUN chmod -R 777 /docker-entrypoint-initdb.d/
