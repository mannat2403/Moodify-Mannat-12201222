"# 🎧 Moodify – AI-Powered Emotion-Based Music Recommender"


**Project Overview:-**

Moodify is an intelligent web application that detects user emotions through two methods:
  1. Facial Expression Recognition – Using your webcam to analyze real-time emotions.
  2. Text-Based Sentiment Analysis – Analyzing typed text to understand your feelings.
Once your mood is detected, Moodify instantly curates a personalized playlist of YouTube music videos that resonate with your current emotional state.

**Problem Statement:-** 

Challenge:
People spend excessive time scrolling through countless playlists trying to find music that matches their current mood. The traditional search process is:
* Time-consuming and frustrating
* Lacks personalization based on emotional state
* Requires manual effort to explore different genres

Impact:
Users often skip multiple songs before finding something that fits their feelings, leading to a poor listening experience.


**Solution Summary:-**

Moodify uses a webcam or text-based emotion detector powered by AI to analyze a user's emotions.
Once the mood is detected, the system fetches curated songs from Youtube that matches the user's emotion.
The app provides an intuitive interface where users can see their detected mood, explore playlists, and toggle between “auto” and “manual” modes.
Example Flow:
1. Automatically detecting user emotions through AI-powered facial recognition or text analysis
2. Instantly curating mood-specific playlists from YouTube's vast music library
3. Providing an intuitive interface with real-time mood detection and dynamic background themes
4. Supporting 8 distinct moods: Happy, Sad, Calm, Energetic, Romantic, Angry, Fearful, and Surprised


**Tech Stack:-**

Backend-

* Python 3.10+ – Core programming language
* Flask – Lightweight web framework for API endpoints
* python-dotenv – Environment variable management

Frontend-

* HTML5/CSS3 – Structure and styling
* JavaScript (ES6+) – Client-side interactivity
* face-api.js – Real-time facial expression detection
* Responsive Design – Mobile-friendly interface

AI/ML Models-

* TinyFaceDetector – Lightweight face detection model
* FaceExpressionNet – Emotion classification from facial features
* Custom NLP Logic – Keyword-based sentiment analysis

APIs & External Services-

* YouTube Data API v3 – Fetching mood-based music videos
* MediaDevices API – Webcam access for facial recognition

Version Control & Deployment-

* Git & GitHub – Source code management
* Flask Development Server – Local testing
* Deployment-ready for Render, Vercel, or Heroku


**Demo Video:-**
Youtube video link-
  
  https://youtu.be/X5gu7heIjnk?si=ZzevWKXH85tMkmlS


**Features:- **

✅ Dual Mood Detection

* Webcam-based facial emotion recognition using face-api.js
* Text-based sentiment analysis with keyword matching

✅ Real-Time Music Recommendations

* Fetches top 5 YouTube videos per mood
* Displays video thumbnails, titles, and channel names

✅ Dynamic UI Experience

* Background gradients change based on detected mood
* Smooth animations and hover effects
* Fully responsive design for mobile and desktop

✅ 8 Emotion Categories

* Happy, Sad, Calm, Energetic, Romantic, Angry, Fearful, Surprised

✅ Privacy-Focused

* Webcam processing happens locally in the browser
* No video data is stored or transmitted to servers

✅ Keyboard Support

* Press Enter to analyze text mood instantly


**Project Structure:-** 

moodify/
├── app/
│   └── main.py                    
├── static/
│   ├── models/                    
│   │   ├── face_expression_model-weights_manifest.json
│   │   ├── face_expression_model-shard1
│   │   ├── tiny_face_detector_model-weights_manifest.json
│   │   └── tiny_face_detector_model-shard1
│   ├── script.js                 
│   ├── style.css                  
│   └── music-heart-logo.png       
├── templates/
│   └── index.html                 
├── .env                           
├── .gitignore                     
├── requirements.txt               
├── oldkeys.txt                    
└── README.md                     


**Technical Architecture:-**

1. Frontend captures emotion via webcam or text input
2. face-api.js processes facial expressions locally (browser-side)
3. JavaScript sends detected mood to Flask backend via /detect_mood endpoint
4. Flask maps mood keywords and queries YouTube API
5. YouTube API returns top 5 music videos matching the mood
6. Backend sends JSON response with mood and video details
7. Frontend updates UI with mood-themed background and video playlist


**Future Enhancements:-**

 * Spotify Integration – Direct playlist creation in user's Spotify account
 * Emotion History – Track mood patterns over time with charts
 * Multi-Language Support – NLP for non-English text input
 * Voice-Based Detection – Analyze vocal tone for emotion recognition
 * Collaborative Playlists – Share mood-based playlists with friends
 * Dark Mode – Toggle between light/dark themes
 * Advanced ML Models – Fine-tuned emotion detection with deeper networks
 * User Accounts – Save favorite moods and playlists


**Setup Instructions:-**

# 1. Clone the repository
git clone https://github.com/<your-username>/moodify.git
cd moodify

# 2. Create a virtual environment (recommended)
python -m venv venv

# 3. Activate the virtual environment
# For Windows:
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Set up environment variables
# Create a .env file in the root directory and add your API key:
# You can do this manually or use the command below:

# For Windows (Command Prompt):
echo YOUTUBE_API_KEY=your_api_key_here > .env

# For Windows (PowerShell):
Add-Content .env "YOUTUBE_API_KEY=your_api_key_here"

# For macOS/Linux:
echo "YOUTUBE_API_KEY=your_api_key_here" > .env

# 6. Run the Flask application
python app/main.py

# 7. Open your browser and navigate to:
# http://127.0.0.1:5000 or http://localhost:5000


**References:-**

  Flask Documentation - Web framework
  YouTube Data API v3 - Video search API
  face-api.js - Face detection library
  Python dotenv - Environment variables
  Face Detection Tutorial


**Acknowledgements:- **

Libraries & Frameworks-
  Flask – Micro web framework
  face-api.js – JavaScript face recognition library
  YouTube Data API – Video search and metadata

Design Inspiration-
  Gradient backgrounds
  Google Material Design

Special Thanks-
  TensorFlow.js for powering face-api.js models
  Anthropic's Claude for development assistance
  Open-source community for continuous inspiration


**Contact:-**

Developer: Mannat
Email: mannatgoyal80@gmail.com
GitHub: [@mannat2403](https://github.com/mannat2403)
LinkedIn: https://www.linkedin.com/in/mannat-goyal-971137252/

