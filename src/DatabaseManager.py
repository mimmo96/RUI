import psycopg2

from utilities import Singleton

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
