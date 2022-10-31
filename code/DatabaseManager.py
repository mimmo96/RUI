from mysql.connector import (connection)

MySQL_host = "sql.freedb.tech"
MySQL_user = "freedb_mariorui"
MySQL_password = "w!UpGmqcBvtW7a*"
MySQL_db = "freedb_mariorui"

def __open_connection():
    try:
        cnx = connection.MySQLConnection(user=MySQL_user, password=MySQL_password,
                                         host=MySQL_host, database=MySQL_db)
        cursor = cnx.cursor()
    except Exception as e:
        print("[error] Connection Error"+str(e))
        return None, None

    return cnx, cursor

def __close_connection(connection, cursor):
    connection.commit()
    cursor.close()
    connection.close()

def test_connection():
    connection, cursor = __open_connection()
    if connection is not None:
        query = "select count(*) from tmp"
        cursor.execute(query)

        count = 0
        for (c) in cursor:
            count = c

        __close_connection(connection, cursor)
        return "Ci sono :"+str(count[0])+" record"
    else:
        return "[Error] Connection is null"