from flask import Flask, session, request
import requests
import os
import psycopg2

api = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='flask_db',
                            user=os.environ['DB_USERNAME'],
                            password=os.environ['DB_PASSWORD'])
    return conn

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

    # If user already exists.
    rows = db.execute("SELECT * FROM users WHERE email = :email", email=user_email)
    if len(rows) == 1:
        return

    # Generate UUID
    user_uuid = uuid.uuid4()

    # Register user.
    reg_user = db.execute(
        "INSERT INTO users (userid, firstname, lastname, password, email, unit, street, city, country) VALUES (id, firstname, lastname, password, email, unit, street, city, country)", 
        id=user_uuid,
        firstname=user_firstname, 
        lastname=user_lastname, 
        password=user_password, 
        email=user_email, 
        unit=user_unit,
        street=user_street,
        city=user_city,
        country=user_country
    )

    session["user_id"] = reg_user
    flash(f"You have Registered as {reg_username}!")

@api.route('/login')
def login():

@api.route('/map', methods=['GET'])
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

@api.route('/map/radius/<origin>/<dest>/<radius>', methods=['GET'])
def get_filtered_ticks(origin, dest, radius):
    result = []
    for d in dest:
        url = f'https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={d}&key=AIzaSyCi4Z6r3IAxS0ywrRniNwvzUFreM7poFyk'
        res = requests.get(url)
        if res.status_code == 200 and res.json()['rows'][0]['elements'][0]['status'] != 'NOT_FOUND':
            dist = res.json()['rows'][0]['elements'][0]['distance']['text']
            dur = res.json()['rows'][0]['elements'][0]['duration']['text']
            if dist <= radius:
                result.append({'dist': dist, 'dur': dur})
    return result

@api.route('/helpRequests', methods=['GET'])
def get_help_requests():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM books;')
    help_requests = cur.fetchall()
    cur.close()
    conn.close()
    return help_requests

@api.route('/profile', methods=['GET'])
def get_profile():
    return {'name': 'John', 'age': '30'}
