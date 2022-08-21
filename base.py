from flask import Flask, session, request
import uuid
from util import get_db_connection, get_filtered_ticks

api = Flask(__name__)

@api.route('/register')
def register():
    conn = get_db_connection()
    cur = conn.cursor()

    user_firstname = request.form.get("first_name")
    user_lastname = request.form.get("last_name")
    user_password = request.form.get("password")
    user_email = request.form.get("email")
    user_unit = request.form.get("unit")
    user_street = request.form.get("street")
    user_city = request.form.get("city")
    user_country = request.form.get("country")

    # If user misses input field.
    if not (user_firstname and user_lastname and user_password and user_email, user_unit and user_street and user_city and user_country):
        return
    
    conn = get_db_connection()
    cur = conn.cursor()

    # If user already exists.
    cur.execute("SELECT * FROM users WHERE email = :email", email=user_email)
    if len(cur.fetchall()) == 1:
        cur.close()
        conn.close()
        return

    # Generate UUID
    user_uuid = uuid.uuid4()

    # Register user.
    cur.execute(
        "INSERT INTO users (userid, firstname, lastname, password, email, unit, street, city, country) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", 
        (
            user_uuid,
            user_firstname, 
            user_lastname, 
            user_password, 
            user_email, 
            user_unit,
            user_street,
            user_city,
            user_country
        )
    )

    session["user_id"] = user_uuid
    return session["user_id"]

@api.route('/login')
def login():
    return

@api.route('/logout')
def logout():
    session.clear()
    return session["user_id"]

@api.route('/edit-profile', methods=["PATCH"])
def edit_profile():
    update_profile = request.get_json()

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'UPDATE users SET firstname=%s, lastname=%s, password=%s, email=%s, unit=%s, street=%s, city=%s, country=%s WHERE userid == %s',
        (
            update_profile.user_uuid,
            update_profile.user_firstname, 
            update_profile.user_lastname, 
            update_profile.user_password, 
            update_profile.user_email, 
            update_profile.user_unit,
            update_profile.user_street,
            update_profile.user_city,
            update_profile.user_country
        )
    )
    users = cur.fetchall()
    cur.close()
    conn.close()
    return users
    
@api.route('/test', methods=['GET'])
def get_db_values():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DROP TABLE IF EXISTS users;')
    cur.execute('CREATE TABLE users (user_id varchar (100) PRIMARY KEY NOT NULL,'
                                    'first_name varchar (50) NOT NULL,'
                                    'last_name varchar (50) NOT NULL,'
                                    'email varchar (50) NOT NULL,'
                                    'password varchar (50) NOT NULL,'
                                    'location varchar (100)',
                                    'is_contractor BOOLEAN NOT NULL,'
    )
    cur.execute('DROP TABLE IF EXISTS requests;')
    cur.execute('CREATE TABLE requests (request_id varchar (100) PRIMARY KEY NOT NULL,',
                                    'user_id varchar (50) NOT NULL,',
                                    'title varchar (50) NOT NULL,'
                                    'description varchar (50) NOT NULL,'
                                    'location varchar (100) NOT NULL,'
                                    'contact_info varchar (100) NOT NULL,'
                                    'compensation varchar (50) NOT NULL,'
                                    'is_complete BOOLEAN NOT NULL,'
    )

    tables = cur.fetchall()
    cur.close()
    conn.close()
    return tables

@api.route('/helpRequests', methods=['GET', 'POST', 'PATCH'])
def handle_help_requests():
    conn = get_db_connection()
    cur = conn.cursor()

    # get all help requests
    if request.method == 'GET':
        cur.execute('SELECT * FROM requests WHERE (is_complete == FALSE AND user_id == %s);', session["user_id"])
        help_requests = cur.fetchall()

        return help_requests

    # create a new help request
    elif request.method == 'POST':
        request_id = uuid.uuid4()
        title = request.form.get("title")
        description = request.form.get("description")
        location = request.form.get("location")
        contact_info = request.form.get("contact_info")
        compensation = request.form.get("compensation")
        user_id = session["user_id"]
        
        cur.execute('INSERT INTO requests (request_id, title, description, location, contact_info, compensation, user_id)'
                    'VALUES (%s, %s, %s, %s, %s, %s, %s)',
                    (request_id, title, description, location, contact_info, compensation, user_id)
                    )

    # patch a help request
    elif request.method == 'PATCH':
        request_id = request.form.get("request_id")
        cur.execute('UPDATE requests SET is_complete == TRUE WHERE request_id = %s', (request_id))

    cur.close()
    conn.close()
