// -----------------------------
// DOM references
// -----------------------------
const textInput = document.getElementById("text-input");
const analyzeBtn = document.getElementById("analyze-text-btn");
const youtubeContainer = document.getElementById("youtube-list");
const moodDisplay = document.getElementById("detected-mood").querySelector("span");
const video = document.getElementById("webcam");
const startBtn = document.getElementById("start-webcam-btn");

let audioPlayer = new Audio();

// -----------------------------
// Fetch YouTube videos from Flask
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

        // Update mood display & background
        moodDisplay.textContent = mood;
        document.body.className = mood;

        // Display YouTube videos only
        displayYouTubeVideos(data.youtube_videos || []);

    } catch (error) {
        console.error("Error fetching videos:", error);
        alert("Something went wrong while fetching mood videos.");
        displayYouTubeVideos([]);
    }
}

// -----------------------------
// Display YouTube videos
// -----------------------------
function displayYouTubeVideos(videos) {
    youtubeContainer.innerHTML = "";
    if (videos.length === 0) {
        youtubeContainer.innerHTML = "<li>No YouTube videos found for this mood.</li>";
        return;
    }

    videos.forEach(video => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${video.thumbnail}" width="50">
            <a href="${video.video_url}" target="_blank"><strong>${video.title}</strong></a> - ${video.channel}
        `;
        youtubeContainer.appendChild(li);
    });
}

// -----------------------------
// Text-based mood detection
// -----------------------------
analyzeBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
    if (text) fetchMoodVideos(text);
});

textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const text = textInput.value.trim();
        if (text) fetchMoodVideos(text);
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
        }, 5000);
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
    if (expressions.surprised > 0.5) return "Surprised";
    if (expressions.fear > 0.5) return "Fearful";
    if (expressions.disgust > 0.5 || expressions.neutral > 0.5) return "Calm";
    return "Happy";
}
