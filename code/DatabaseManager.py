import psycopg2
from psycopg2 import Error

class DatabaseManager:

    def __init__(self):
        self.__connection = psycopg2.connect(user="postgres",
                                      password="fNLM#D6544nrWGQ",
                                      host="db.yinuxpufluddvhjoglbm.supabase.co",
                                      port="5432",
                                      database="postgres")

    def ping(self):
        cursor = self.__connection.cursor()
        # Executing a SQL query
        cursor.execute("SELECT version();")
        # Fetch result
        record = cursor.fetchone()
        return record

    def get_data(self):
        query = "select * from machine_data"

        cursor = self.__connection.cursor()
        cursor.execute(query)
        # Fetch result
        records = cursor.fetchall()

        data = []

        for item in records:
            data.append(item)
        return data
