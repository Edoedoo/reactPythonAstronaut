import bcrypt
from db import getConnection


            # ====== LOGIN ======
def loginUser(username, password):
    conn = getConnection()
    cur = conn.cursor(dictionary=True)
    try:
        cur.execute("SELECT * FROM users WHERE username=%s", (username,))
        user = cur.fetchone()
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            return user
        else:
            return None
    except Exception as e:
        print("Error saat login:", e)
        return None
    finally:
        if conn:
            conn.close()
def registerUser(username, email, password):
    conn = getConnection()
    cur = conn.cursor()
    try:
        hashed = bcrypt.hashpw(password_plain.encode('utf-8'), bcrypt.gensalt())
        cur.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", 
                    (username, email, hashed.decode('utf-8')))
        conn.commit()
        return True
    except Exception as e:
        print("Error saat register:", e)
        return False
    finally:
        if conn:
            conn.close()


def getAllUsers():
    conn = getConnection()
    cur = conn.cursor(dictionary=True)
    try :    
        cur.execute("SELECT * FROM users")
        result = cur.fetchall()
        return result
    except Exception as e:
        print("gagal mengambil data dari databae", e)
        return None
    finally:
        if conn:
            conn.close()

def addUser(name, user):
    conn = getConnection()
    cur = conn.cursor()
    try :
        cur.execute("INSERT INTO users (name, user) VALUES (%s, %s)", (name, user))
        conn.commit()
        return True
    except Exception as e:
        print("Gagal menambahkan user:", e)
        return False
    finally:
        if conn:
            conn.close()


def updateUser(id, name, user):
    conn = getConnection()
    cur = conn.cursor()
    try:    
        cur.execute("UPDATE users SET name=%s, user=%s WHERE id=%s", (name, user, id))
        conn.commit()
        return True
    except Exception as e:
        print("gagal memperbarui user", e)
        return False
    finally:
        if conn:
            conn.close()

def deleteUser(id):
    conn = getConnection()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM users WHERE id=%s", (id,))
        conn.commit()
        return True
    except Exception as e:
        print("gagal hapus user", e) 
        return False
    finally:
        if conn:
            conn.close()

