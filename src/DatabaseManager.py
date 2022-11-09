import psycopg2

from flask import jsonify
from utilities import Singleton
from utilities.utilities import convert_to_json

class DatabaseManager(metaclass=Singleton.Singleton):

    def __init__(self):
        print("===> DatabaseManager init")
        self.__connection = psycopg2.connect( user="postgres",
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

    def get_cursor(self):
        return self.__connection.cursor()

    def query_db(self, query):
        cursor = self.get_cursor()

        try:
            cursor.execute(query)
            records = cursor.fetchall()
            cursor.close()
        except:
            # If format is malformed or query doesn't end correctly
            cursor.close()
            response = jsonify(['Bad request!'])
            response.status_code = 400
            return response

        response = jsonify(convert_to_json(records))
        response.status_code = 200
        return response
