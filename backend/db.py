import mysql.connector

def getConnection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="ec3000**",
        database="ig_clone"
    )
