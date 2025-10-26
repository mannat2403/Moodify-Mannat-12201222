// -----------------------------
// DOM references
// -----------------------------
<<<<<<< HEAD
const textInput = document.getElementById("text-input");
const analyzeBtn = document.getElementById("analyze-text-btn");
const youtubeContainer = document.getElementById("youtube-list");
const moodDisplay = document.getElementById("detected-mood").querySelector("span");
const video = document.getElementById("webcam");
const startBtn = document.getElementById("start-webcam-btn");

let audioPlayer = new Audio();

// -----------------------------
// Fetch YouTube videos from Flask
=======
const predefinedPlaylists = {
    Happy: ["Song A - Artist 1", "Song B - Artist 2", "Song C - Artist 3"],
    Sad: ["Song D - Artist 4", "Song E - Artist 5", "Song F - Artist 6"],
    Calm: ["Song G - Artist 7", "Song H - Artist 8", "Song I - Artist 9"],
    Energetic: ["Song J - Artist 10", "Song K - Artist 11", "Song L - Artist 12"],
    Romantic: ["Song M - Artist 13", "Song N - Artist 14"],
    Angry: ["Song O - Artist 15", "Song P - Artist 16"],
    Fearful: ["Song Q - Artist 17", "Song R - Artist 18"],
    Surprised: ["Song S - Artist 19", "Song T - Artist 20"]
};

// -----------------------------
// DOM references
// -----------------------------
const textInput = document.getElementById("text-input");
const analyzeBtn = document.getElementById("analyze-text-btn");
const playlistContainer = document.getElementById("songs-list");
const youtubeContainer = document.getElementById("youtube-list");
const moodDisplay = document.getElementById("detected-mood").querySelector("span");
const video = document.getElementById("webcam");
const startBtn = document.getElementById("start-webcam-btn");

let audioPlayer = new Audio();

// -----------------------------
// Fetch playlist from Flask (Deezer & YouTube)
>>>>>>> e11cd42880d14026f6ea584a14fd8bc5932d0027
// -----------------------------
async function fetchMoodVideos(text) {
    try {
        const response = await fetch("/detect_mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        const mood = data.mood || "Happy";
<<<<<<< HEAD
=======
        const playlist = (data.playlist && data.playlist.length)
            ? data.playlist
            : predefinedPlaylists[mood] || predefinedPlaylists["Happy"];
>>>>>>> e11cd42880d14026f6ea584a14fd8bc5932d0027

        // Update mood display & background
        moodDisplay.textContent = mood;
        document.body.className = mood;

<<<<<<< HEAD
        // Display YouTube videos only
        displayYouTubeVideos(data.youtube_videos || []);

    } catch (error) {
        console.error("Error fetching videos:", error);
        alert("Something went wrong while fetching mood videos.");
=======
        // Display playlists & YouTube videos safely
        displayPlaylist(playlist || []);
        displayYouTubeVideos(data.youtube_videos || []);

    } catch (error) {
        console.error("Error fetching playlist:", error);
        alert("Something went wrong. Using fallback playlist.");
        const mood = text.charAt(0).toUpperCase() + text.slice(1);
        displayPlaylist(predefinedPlaylists[mood] || predefinedPlaylists["Happy"]);
>>>>>>> e11cd42880d14026f6ea584a14fd8bc5932d0027
        displayYouTubeVideos([]);
    }
}

// -----------------------------
<<<<<<< HEAD
// Display YouTube videos
// -----------------------------
function displayYouTubeVideos(videos) {
    youtubeContainer.innerHTML = "";
    if (videos.length === 0) {
        youtubeContainer.innerHTML = "<li>No YouTube videos found for this mood.</li>";
=======
// Display Deezer playlist (safe version)
// -----------------------------
function displayPlaylist(playlist) {
    playlistContainer.innerHTML = "";

    // If playlist is empty, show message
    if (!playlist.length) {
        playlistContainer.innerHTML = "<p>No songs found for this mood.</p>";
        return;
    }

    playlist.forEach(track => {
        // Handle both predefined (string) and Deezer (object) playlists
        if (typeof track === "string") {
            const li = document.createElement("li");
            li.textContent = track;
            playlistContainer.appendChild(li);
            return;
        }

        // Skip invalid tracks
        if (!track.title || track.title === "Unknown Title") return;
        if (!track.artist || track.artist === "Unknown Artist") return;

        const li = document.createElement("li");
        li.classList.add("song-card");
        li.innerHTML = `
            ${track.album_cover ? `<img src="${track.album_cover}" width="50" alt="Cover">` : ""}
            <strong>${track.title}</strong> ${track.artist ? `- ${track.artist}` : ""}
            ${track.preview ? `<audio controls src="${track.preview}"></audio>` : ""}
        `;
        playlistContainer.appendChild(li);
    });
}

// -----------------------------
// Display YouTube videos (safe version)
// -----------------------------
function displayYouTubeVideos(videos) {
    youtubeContainer.innerHTML = "";

    // If no videos
    if (!videos.length) {
        youtubeContainer.innerHTML = "<p>No YouTube videos found for this mood.</p>";
>>>>>>> e11cd42880d14026f6ea584a14fd8bc5932d0027
        return;
    }

    videos.forEach(video => {
<<<<<<< HEAD
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${video.thumbnail}" width="50">
            <a href="${video.video_url}" target="_blank"><strong>${video.title}</strong></a> - ${video.channel}
=======
        if (!video.video_url || video.video_url === "undefined") return;

        const li = document.createElement("li");
        li.classList.add("video-card");
        li.innerHTML = `
            ${video.thumbnail ? `<img src="${video.thumbnail}" width="50" alt="Thumbnail">` : ""}
            <a href="${video.video_url}" target="_blank"><strong>${video.title || "Untitled Video"}</strong></a>
            ${video.channel ? ` - ${video.channel}` : ""}
>>>>>>> e11cd42880d14026f6ea584a14fd8bc5932d0027
        `;
        youtubeContainer.appendChild(li);
    });
}

// -----------------------------
// Text-based mood detection
// -----------------------------
analyzeBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
<<<<<<< HEAD
    if (text) fetchMoodVideos(text);
=======
    if (text) fetchPlaylist(text);
>>>>>>> e11cd42880d14026f6ea584a14fd8bc5932d0027
});

textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const text = textInput.value.trim();
<<<<<<< HEAD
        if (text) fetchMoodVideos(text);
=======
        if (text) fetchPlaylist(text);
>>>>>>> e11cd42880d14026f6ea584a14fd8bc5932d0027
    }
});

// -----------------------------
// Webcam-based mood detection
// -----------------------------
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/static/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/static/models')
]).then(() => startBtn.disabled = false);

startBtn.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;

        setInterval(async () => {
            const detection = await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();

            if (detection) {
                const mood = mapExpressionsToMood(detection.expressions);
                fetchMoodVideos(mood);
            }
<<<<<<< HEAD
        }, 5000);
=======
        }, 2000);
>>>>>>> e11cd42880d14026f6ea584a14fd8bc5932d0027
    } catch (err) {
        console.error("Camera error:", err);
        alert("Cannot access webcam.");
    }
});

// -----------------------------
// Map face-api expressions to moods
// -----------------------------
function mapExpressionsToMood(expressions) {
    if (expressions.happy > 0.5) return "Happy";
    if (expressions.sad > 0.5) return "Sad";
    if (expressions.angry > 0.5) return "Energetic";
<<<<<<< HEAD
=======
    if (expressions.romantic > 0.5) return "Romantic"; // optional
>>>>>>> e11cd42880d14026f6ea584a14fd8bc5932d0027
    if (expressions.surprised > 0.5) return "Surprised";
    if (expressions.fear > 0.5) return "Fearful";
    if (expressions.disgust > 0.5 || expressions.neutral > 0.5) return "Calm";
    return "Happy";
}
