FROM python:3.8

WORKDIR /code
COPY code .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ENTRYPOINT ["python"]
CMD ["app.py"]