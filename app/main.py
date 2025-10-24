from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__, template_folder="../templates", static_folder="../static")

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/detect_mood", methods=["POST"])
def detect_mood():
    data = request.get_json()
    text = data.get("text", "").lower()

    # Simple mood detection
    mood = "Happy"
    if "sad" in text or "down" in text:
        mood = "Sad"
    elif "calm" in text or "relax" in text:
        mood = "Calm"
    elif "energy" in text or "excited" in text:
        mood = "Energetic"

    # Fetch Deezer playlist (example)
    playlist = []
    try:
        url = f"https://api.deezer.com/search?q={mood}"
        res = requests.get(url).json()
        for track in res["data"][:5]:
            playlist.append({
                "title": track["title"],
                "artist": track["artist"]["name"],
                "album_cover": track["album"]["cover_small"],
                "preview": track["preview"]
            })
    except:
        playlist = []

    return jsonify({"mood": mood, "playlist": playlist})


if __name__ == "__main__":
    app.run(debug=True)
