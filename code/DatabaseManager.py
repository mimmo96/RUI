from mysql.connector import (connection)

class DatabaseManager:
    __MySQL_host     = "sql.freedb.tech"
    __MySQL_user     = "freedb_mariorui"
    __MySQL_password = "w!UpGmqcBvtW7a*"
    __MySQL_db       = "freedb_mariorui"
    __cursor = None
    __connection = None

    def __init__(self):
        self.__connection = connection.MySQLConnection(user=self.__MySQL_user, password=self.__MySQL_password, host=self.__MySQL_host, database=self.__MySQL_db)
        self.__cursor     = self.__connection.cursor()

    def commit(self):
        self.__connection.commit()

    def ping(self):
        query = "select count(*) from tmp"
        cur = self.__connection.cursor()
        cur.execute(query)

        count = 0
        for (c) in cur:
            count = c
        return count[0]

    def insert_tmp(self, id):
        query = "INSERT INTO tmp (id) VALUES (%s)"
        cur = self.__connection.cursor()
        vales = (id,)
        cur.execute(query, vales)
        self.commit()

    def insert_update(self, id):
        query = "INSERT INTO tmp (id) VALUES (%s)"
        cur = self.__connection.cursor()
        vales = (id,)
        cur.execute(query, vales)
        self.commit()

if __name__ == '__main__':
    db = DatabaseManager()
    print(db.ping())
    db.insert_tmp("126378")
    print(db.ping())