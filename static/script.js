// -----------------------------
// Predefined playlists (fallback)
// -----------------------------
const predefinedPlaylists = {
    Happy: ["Song A - Artist 1", "Song B - Artist 2", "Song C - Artist 3"],
    Sad: ["Song D - Artist 4", "Song E - Artist 5", "Song F - Artist 6"],
    Calm: ["Song G - Artist 7", "Song H - Artist 8", "Song I - Artist 9"],
    Energetic: ["Song J - Artist 10", "Song K - Artist 11", "Song L - Artist 12"]
};

// -----------------------------
// Fetch playlist from Flask (Deezer API)
// -----------------------------
async function fetchPlaylist(text) {
    try {
        const response = await fetch("/detect_mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        document.querySelector("#detected-mood span").textContent = data.mood;
        displayPlaylist(data.playlist);

        } catch (error) {
        console.error("Error fetching playlist:", error);
        alert("Something went wrong while fetching the playlist. Please try again!");
        }
    }

// -----------------------------
// Text-based mood detection
// -----------------------------
document.getElementById("analyze-text-btn").addEventListener("click", () => {
    const text = document.getElementById("text-input").value;
    if(text.trim() !== "") fetchPlaylist(text);
});


        // Update background based on mood
        // document.body.className = data.mood || "Happy";

//     } catch (err) {
//         console.error("Error fetching playlist:", err);
//         const mood = text.charAt(0).toUpperCase() + text.slice(1);
//         displayPlaylist(predefinedPlaylists[mood] || predefinedPlaylists["Happy"]);
//         document.body.className = mood || "Happy";
//     }
// }


// -----------------------------
// Webcam-based mood detection
// -----------------------------
const video = document.getElementById("webcam");
const startBtn = document.getElementById("start-webcam-btn");

// Load face-api models from static/models folder
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/static/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/static/models')
]).then(() => {
    startBtn.disabled = false;
    console.log("Face-api models loaded");
});

//Start webcam and mood detection
startBtn.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;

        // Start face detection every 2 seconds
        setInterval(async () => {
            const detection = await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();

            if (detection) {
                const mood = mapExpressionsToMood(detection.expressions);
                fetchPlaylist(mood);
            }
        }, 2000);
        
    } catch (err) {
        console.error("Camera error:", err);
        alert("Cannot access webcam. Check permissions!");
    }
});

// -----------------------------
// Map face-api expressions to Moodify moods
// -----------------------------
function mapExpressionsToMood(expressions) {
    if (expressions.happy > 0.5) return "Happy";
    if (expressions.sad > 0.5) return "Sad";
    if (expressions.angry > 0.5) return "Energetic";
    if (expressions.neutral > 0.5 || expressions.disgust > 0.5 || expressions.fear > 0.5) return "Calm";
    return "Happy";
}

// -----------------------------
// Display playlist
// -----------------------------
function displayPlaylist(playlist) {
    const list = document.getElementById("songs-list");
    list.innerHTML = "";

    playlist.forEach(track => {
        const li = document.createElement("li");
        li.innerHTML = `
                <img src="${track.album_cover}" width="50">
                <strong>${track.title}</strong> - ${track.artist}
                <audio controls>
                    <source src="${track.preview}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `;
        list.appendChild(li);
    });
}
