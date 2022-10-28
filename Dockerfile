FROM python:3.6.1-alpine

WORKDIR /code
COPY code .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
#RUN pip install flask_mysqldb

ENTRYPOINT ["python"]
CMD ["app.py"]