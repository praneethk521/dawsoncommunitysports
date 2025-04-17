import os
import hashlib
import requests
from flask import Flask, redirect, request, jsonify, session
from urllib.parse import urlencode
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.urandom(24)  # for session management

# Load from .env
CLIENT_ID = os.getenv("PACER_CLIENT_ID")
CLIENT_SECRET = os.getenv("PACER_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

# Utils for signature
def md5(s):
    return hashlib.md5(s.encode('utf-8')).hexdigest()

def generate_signature():
    app_secret_hash = md5(CLIENT_SECRET + "pacer_oauth")
    return md5(app_secret_hash + CLIENT_ID)

# 1. Redirect user to Pacer OAuth
@app.route("/login")
def login():
    query = urlencode({
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "state": "xyz"
    })
    return redirect(f"http://developer.mypacer.com/oauth2/dialog?{query}")

# 2. Handle redirect with code
@app.route("/callback")
def callback():
    code = request.args.get("code")
    auth_result = request.args.get("auth_result")

    if auth_result != "success" or not code:
        return "Authorization failed", 400

    # 3. Exchange code for access_token
    headers = {
        "Authorization": generate_signature(),
        "Content-Type": "application/json"
    }
    payload = {
        "client_id": CLIENT_ID,
        "code": code,
        "grant_type": "authorization_code"
    }
    resp = requests.post("http://openapi.mypacer.com/oauth2/access_token", 
                         headers=headers, json=payload)
    data = resp.json().get("data", {})
    
    # Save tokens to session (for demo)
    session['access_token'] = data.get("access_token")
    session['user_id'] = data.get("user_id")

    return redirect("/api/pacer-leaderboard")

# 4. Leaderboard endpoint
@app.route("/api/pacer-leaderboard")
def leaderboard():
    token = session.get('access_token')
    user_id = session.get('user_id')

    if not token or not user_id:
        return redirect("/login")

    headers = {
        "Authorization": f"Bearer {token}"
    }

    url = f"http://openapi.mypacer.com/users/{user_id}/activities/daily.json"
    params = {
        "start_date": "2025-04-01",
        "end_date": "2025-04-16",
        "accept_manual_input": "true"
    }
    resp = requests.get(url, headers=headers, params=params)
    data = resp.json().get("data", {})

    # Example transformation (can adjust to return top N)
    summary = {
        "id": user_id,
        "name": "You",
        "steps": sum(d["steps"] for d in data.get("daily_activities", [])),
        "distance": sum(d["walking_running_distance"] for d in data.get("daily_activities", [])) / 1609.34  # meters to miles
    }

    return jsonify([summary])

if __name__ == "__main__":
    app.run(debug=True)
