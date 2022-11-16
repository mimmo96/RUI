import psycopg2

from utilities import Singleton

class DatabaseManager(metaclass=Singleton.Singleton):

    def __init__(self):
        print("===> DatabaseManager init")
        self.__connection = psycopg2.connect( user="postgres",
                                              password="fNLM#D6544nrWGQ",
                                              host="db.yinuxpufluddvhjoglbm.supabase.co",    #db
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

    def query(self, query, params=None):

        cursor = self.get_cursor()
        try:
            if params is None:
                cursor.execute(query)
            else:
                cursor.execute(query, params)
            records = cursor.fetchall()
        except:
            # If format is malformed or query doesn't end correctly
            records = "ERROR"
        finally:
            cursor.close()

        return records

    def command(self, command, params=None, fetch=False):
        cursor = self.get_cursor()
        try:
            if params is None:
                cursor.execute(command)
            else:
                cursor.execute(command, params)

            self.commit_changes()

            if fetch:
                feedback = cursor.fetchone()[0]
            else:
                feedback = ""

        except:
            # If format is malformed or query doesn't end correctly
            feedback = "ERROR"
        finally:
            cursor.close()

        return feedback

    def commit_changes(self):
        self.__connection.commit()
