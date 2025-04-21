from flask import Flask, redirect, request, jsonify, session
import os
import hashlib
import requests
from urllib.parse import urlencode
from dotenv import load_dotenv
from collections import defaultdict

load_dotenv()
app = Flask(__name__)
app.secret_key = os.urandom(24)

CLIENT_ID = os.getenv("PACER_CLIENT_ID")
CLIENT_SECRET = os.getenv("PACER_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

# Replace with your real values
CLUB_ID = "B42646953"
CHALLENGE_IDS = ["BKS92XP3", "BB6FSY97", "BD2P17BP"]

def md5(s):
    return hashlib.md5(s.encode('utf-8')).hexdigest()

def generate_signature():
    app_secret_hash = md5(CLIENT_SECRET + "pacer_oauth")
    return md5(app_secret_hash + CLIENT_ID)

@app.route("/login")
def login():
    query = urlencode({
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "state": "xyz"
    })
    return redirect(f"http://developer.mypacer.com/oauth2/dialog?{query}")

@app.route("/callback")
def callback():
    code = request.args.get("code")
    auth_result = request.args.get("auth_result")

    if auth_result != "success" or not code:
        return "Authorization failed", 400

    headers = {
        "Authorization": generate_signature(),
        "Content-Type": "application/json"
    }
    payload = {
        "client_id": CLIENT_ID,
        "code": code,
        "grant_type": "authorization_code"
    }
    resp = requests.post("http://openapi.mypacer.com/oauth2/access_token", headers=headers, json=payload)
    data = resp.json().get("data", {})
    
    session['access_token'] = data.get("access_token")
    session['user_id'] = data.get("user_id")
    return redirect("/api/pacer-leaderboard")

@app.route("/api/pacer-leaderboard")
def leaderboard():
    token = session.get('access_token')
    if not token:
        return redirect("/login")

    headers = {
        "Authorization": f"Bearer {token}"
    }

    # List your actual Pacer challenge IDs here
    challenge_ids = [
        "BKS92XP3",  # replace with your real challenge IDs
        "BB6FSY97",
        "BD2P17BP"
    ]
    club_id = "B42646953"  # your club ID

    all_leaders = []

    for challenge_id in challenge_ids:
        url = f"http://openapi.mypacer.com/groups/{club_id}/challenges/{challenge_id}/leaderboard"
        resp = requests.get(url, headers=headers)
        if resp.status_code == 200 and resp.json().get("data"):
            challenge_leaders = resp.json().get("data", {}).get("leaderboard", [])
            all_leaders.extend(challenge_leaders)

    # Combine and summarize unique users across all challenges
    leaderboard_map = {}

    for entry in all_leaders:
        uid = entry.get("user_id")
        if not uid:
            continue

        if uid not in leaderboard_map:
            leaderboard_map[uid] = {
                "id": uid,
                "name": entry.get("display_name", "Unknown"),
                "steps": entry.get("steps", 0),
                "distance": entry.get("distance", 0.0),
            }
        else:
            leaderboard_map[uid]["steps"] += entry.get("steps", 0)
            leaderboard_map[uid]["distance"] += entry.get("distance", 0.0)

    # Return as sorted list
    sorted_leaderboard = sorted(
        leaderboard_map.values(), key=lambda x: x["distance"], reverse=True
    )

    return jsonify(sorted_leaderboard)


if __name__ == "__main__":
    app.run(debug=True)
