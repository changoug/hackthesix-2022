from flask import Flask, session, request
import requests
import os
import psycopg2
import psycopg2.extras
import uuid
from util import get_db_connection, get_filtered_ticks

api = Flask(__name__)
psycopg2.extras.register_uuid()

@api.route('/register', methods=['POST'])
def register():
    conn = get_db_connection()
    cur = conn.cursor()

    user_firstname = 'John'
    user_lastname = 'Doe'
    user_password = 'password'
    user_email = 'johndoe@gmail.com'
    user_unit = '12345'
    user_street = 'Main St'
    user_city = 'Anytown'
    user_country = 'USA'
    user_is_contractor = False
    
    conn = get_db_connection()
    cur = conn.cursor()

    # If user misses input field.
    if not (user_firstname and user_lastname and user_password and user_email and user_unit and user_street and user_city and user_country):
        print('Missing input field')
        cur.close()
        conn.close()
        return

    # Generate UUID
    user_uuid = uuid.uuid4()

    # If user already exists.
    rows = cur.execute(f"SELECT * FROM users WHERE user_id = '{user_uuid}'")
    if rows != None:
        print('User already exists')
        cur.close()
        conn.close()
        return

    # Register user
    cur.execute(
        "INSERT INTO users (user_id, first_name, last_name, email, password, location, is_contractor) VALUES " +
        f"('{user_uuid}', '{user_firstname}', '{user_lastname}', '{user_email}', '{user_password}', '{user_unit}, {user_street}, {user_city} {user_country}', {user_is_contractor})")

    session["user_id"] = user_uuid
    return session["user_id"]

@api.route('/login')
def login(email, password):
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
    cur.execute('CREATE TABLE users (user_id (uuid) PRIMARY KEY NOT NULL,'
                                    'first_name varchar (50) NOT NULL,'
                                    'last_name varchar (50) NOT NULL,'
                                    'email varchar (50) NOT NULL,'
                                    'password varchar (50) NOT NULL,'
                                    'location varchar (100)',
                                    'is_contractor BOOLEAN NOT NULL,',
                                    'radius integer);'
    )
    cur.execute('DROP TABLE IF EXISTS requests;')
    cur.execute('CREATE TABLE requests (request_id (uuid) PRIMARY KEY NOT NULL,',
                                    'user_id varchar (50) NOT NULL,',
                                    'title varchar (50) NOT NULL,'
                                    'request_description varchar (50) NOT NULL,'
                                    'location varchar (100) NOT NULL,'
                                    'contact_info varchar (100) NOT NULL,'
                                    'compensation varchar (50) NOT NULL,'
                                    'is_complete BOOLEAN NOT NULL);'
    )

    tables = cur.fetchall()
    cur.close()
    conn.close()
    return tables

@api.route('/helpRequests', methods=['GET', 'POST', 'DELETE'])
def handle_help_requests():
    conn = get_db_connection()
    cur = conn.cursor()

    # get all help requests
    if request.method == 'GET':
        cur.execute('SELECT * FROM requests;')
        help_requests = cur.fetchall()
        return help_requests

    # create a new help request
    elif request.method == 'POST':
        request_id = uuid.uuid4()
        title = 'title'
        description = 'description'
        location = 'location'
        contact_info = 'contact_info'
        compensation = 'compensation'
        user_id = session["user_id"]
        
        cur.execute('INSERT INTO requests (request_id, title, description, location, contact_info, compensation, user_id)'
                    'VALUES (%s, %s, %s, %s, %s, %s, %s)',
                    (request_id, title, description, location, contact_info, compensation, user_id)
                    )

    # delete a help request
    elif request.method == 'DELETE':
        request_id = request.form.get("request_id")
        cur.execute('DELETE FROM requests WHERE request_id = %s', (request_id,))

    cur.close()
    conn.close()
