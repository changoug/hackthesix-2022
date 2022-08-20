from flask import Flask
import requests
import os
import psycopg2
import mysql.connector

api = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='flask_db',
                            user=os.environ['DB_USERNAME'],
                            password=os.environ['DB_PASSWORD'])
    return conn

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
