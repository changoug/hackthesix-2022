from flask import Flask
import requests

api = Flask(__name__)

@api.route('/map/radius/<origin>/<dest>/<radius>')
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

@api.route('/profile', methods=['GET'])
def my_profile():
    return 'Hello World'
