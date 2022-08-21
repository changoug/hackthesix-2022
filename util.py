from sys import pycache_prefix
import psycopg2
from flask import request
from config import config
import os

def get_db_connection():
    # conn = psycopg2.connect(host='localhost',
    #                         database='flask_db',
    #                         user=os.environ['DB_USERNAME'],
    #                         password=os.environ['DB_PASSWORD'])
    params = config()
    return psycopg2.connect(**params)


    return conn

def get_filtered_ticks(origin, dest, radius):
    result = []
    for d in dest:
        url = f'https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={d}&key=AIzaSyCi4Z6r3IAxS0ywrRniNwvzUFreM7poFyk'
        res = request.get(url)
        if res.status_code == 200 and res.json()['rows'][0]['elements'][0]['status'] != 'NOT_FOUND':
            dist = res.json()['rows'][0]['elements'][0]['distance']['text']
            dur = res.json()['rows'][0]['elements'][0]['duration']['text']
            if dist <= radius:
                result.append({'dist': dist, 'dur': dur})
    return result