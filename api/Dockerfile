FROM python:3.8

WORKDIR /src
COPY src .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ENTRYPOINT ["python"]
CMD ["app.py"]