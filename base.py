from flask import Flask, session, request
import requests
import os
import psycopg2
import uuid
from helper_functions import get_db_connection, get_filtered_ticks

api = Flask(__name__)

@api.route('/register')
def register():
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
    rows = cur.execute("SELECT * FROM users WHERE email = :email", email=user_email)
    if len(rows) == 1:
        cur.close()
        conn.close()
        return

    # Generate UUID
    user_uuid = uuid.uuid4()

    # Register user.
    reg_user = cur.execute(
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
    cur.execute('DROP TABLE IF EXISTS books;')
    cur.execute('CREATE TABLE books (id serial PRIMARY KEY,'
                                    'title varchar (150) NOT NULL,'
                                    'author varchar (50) NOT NULL,'
                                    'pages_num integer NOT NULL,'
                                    'review text,'
                                    'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                    )
    cur.execute('INSERT INTO books (title, author, pages_num, review)'
                'VALUES (%s, %s, %s, %s)',
                ('A Tale of Two Cities',
                'Charles Dickens',
                489,
                'A great classic!')
                )
    books = cur.fetchall()
    cur.close()
    conn.close()
    return books