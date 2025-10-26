from flask import Flask, render_template, request, jsonify
import requests
import random
import os
from dotenv import load_dotenv

load_dotenv()
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

app = Flask(__name__, template_folder="../templates", static_folder="../static")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/detect_mood", methods=["POST"])
def detect_mood():
    text = request.json.get("text", "").lower()

    # Mood detection keywords
    mood_keywords = {
        "Happy": ["happy", "joy", "great", "amazing", "love", "wonderful"],
        "Sad": ["sad", "depressed", "lonely", "cry", "hurt", "heartbroken"],
        "Calm": ["calm", "peace", "relax", "chill", "serene", "soothing"],
        "Energetic": ["energy", "workout", "motivated", "active", "fired"],
        "Romantic": ["love", "romantic", "crush", "kiss", "beautiful"],
        "Angry": ["angry", "furious", "mad", "annoyed", "irritated"],
        "Fearful": ["fear", "scared", "terrified", "afraid"],
        "Surprised": ["surprised", "shocked", "wow", "unexpected"]
    }

    # Detect mood
    detected_mood = None
    for mood, words in mood_keywords.items():
        if any(word in text for word in words):
            detected_mood = mood
            break
    if not detected_mood:
        detected_mood = random.choice(list(mood_keywords.keys()))

    # Fetch YouTube videos
    youtube_videos = []
    try:
        yt_url = (
            f"https://www.googleapis.com/youtube/v3/search"
            f"?part=snippet&type=video&q={detected_mood}+songs"
            f"&maxResults=5&key={YOUTUBE_API_KEY}"
        )
        yt_res = requests.get(yt_url).json()
        for item in yt_res.get("items", []):
            video_id = item["id"].get("videoId")
            if not video_id:
                continue
            youtube_videos.append({
                "title": item["snippet"]["title"],
                "channel": item["snippet"]["channelTitle"],
                "thumbnail": item["snippet"]["thumbnails"]["default"]["url"],
                "video_url": f"https://www.youtube.com/watch?v={video_id}"
            })
    except Exception as e:
        print("YouTube API error:", e)
        youtube_videos = []

    return jsonify({
        "mood": detected_mood,
        "youtube_videos": youtube_videos
    })

if __name__ == "__main__":
    app.run(debug=True)
