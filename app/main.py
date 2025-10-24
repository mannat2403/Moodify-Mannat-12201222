from flask import Flask, render_template, request, jsonify
import requests
import random
import os
from dotenv import load_dotenv

# Initialize Flask
app = Flask(__name__, template_folder="../templates", static_folder="../static")

# Load environment variables (optional, if you use a .env file)
load_dotenv()

# ✅ Set YouTube API key safely (replace with your actual key if not using .env)
YOUTUBE_API_KEY = os.getenv( "AIzaSyC46xW9OEkoDZZRZGGPy5Vi7oMH5TEBBWk")

@app.route("/")
def home():
    """Render the homepage"""
    return render_template("index.html")

@app.route("/detect_mood", methods=["POST"])
def detect_mood():
    """Detect mood from user input and return playlists"""
    text = request.json.get("text", "").lower().strip()

    # Keywords for simple mood detection
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

    # 🎵 Fetch from Deezer
    playlist = []
    try:
        deezer_url = f"https://api.deezer.com/search?q={detected_mood}"
        deezer_res = requests.get(deezer_url).json()
        for track in deezer_res.get("data", [])[:5]:
            playlist.append({
                "title": track["title"],
                "artist": track["artist"]["name"],
                "album_cover": track["album"]["cover_small"],
                "preview": track["preview"]
            })
    except Exception as e:
        print("Deezer API error:", e)

    # 🎥 Fetch from YouTube
    youtube_videos = []
    try:
        yt_url = (
            f"https://www.googleapis.com/youtube/v3/search"
            f"?part=snippet&type=video&q={detected_mood}+songs"
            f"&maxResults=5&key={YOUTUBE_API_KEY}"
        )
        yt_res = requests.get(yt_url).json()
        for item in yt_res.get("items", []):
            youtube_videos.append({
                "title": item["snippet"]["title"],
                "channel": item["snippet"]["channelTitle"],
                "thumbnail": item["snippet"]["thumbnails"]["default"]["url"],
                "video_url": f"https://www.youtube.com/watch?v={item['id']['videoId']}"
            })
    except Exception as e:
        print("YouTube API error:", e)

    return jsonify({
        "mood": detected_mood,
        "playlist": playlist,
        "youtube_videos": youtube_videos
    })

if __name__ == "__main__":
    app.run(debug=True)
