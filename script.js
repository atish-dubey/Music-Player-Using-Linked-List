// Initialize the linked list and add tracks
const linkedList = new LinkedList();
const tracks = [
    ["Mellow Breeze", 1, "music/01_SongTitle1.mp3"],
    ["Eternal Sunshine", 2, "music/02_SongTitle2.mp3"],
    ["Infinite Dreams", 3, "music/03_SongTitle3.mp3"],
    ["Night Stroll", 4, "music/04_SongTitle4.mp3"],
    ["Morning Glow", 5, "music/05_SongTitle5.mp3"],
    ["Serene Waters", 6, "music/06_SongTitle6.mp3"],
    ["Whispering Wind", 7, "music/07_SongTitle7.mp3"],
    ["Distant Echoes", 8, "music/08_SongTitle8.mp3"],
    ["Tranquil Sky", 9, "music/09_SongTitle9.mp3"],
    ["Gentle Waves", 10, "music/10_SongTitle10.mp3"],
    ["Mystic Forest", 11, "music/11_SongTitle11.mp3"],
    ["Peaceful Horizon", 12, "music/12_SongTitle12.mp3"],
];

for (const track of tracks) {
    linkedList.push(...track);
}
linkedList.setDefaultPointer();

// DOM elements
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const trackTitle = document.getElementById("trackTitle");
const progressSlider = document.getElementById("progressSlider");
const volumeSlider = document.getElementById("volumeSlider");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");

// Audio element
const audio = new Audio();
let isPlaying = false;

// Initial track setup
audio.src = linkedList.tempPos.musicNode.path;
changeTrackTitle(linkedList.tempPos.musicNode.name);

// Event listeners
playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", () => {
    const prevTrack = linkedList.traverse(-1);
    if (prevTrack) {
        loadTrack(prevTrack);
    }
});
nextBtn.addEventListener("click", () => {
    const nextTrack = linkedList.traverse(1);
    if (nextTrack) {
        loadTrack(nextTrack);
    }
});
progressSlider.addEventListener("input", adjustProgress);
volumeSlider.addEventListener("input", adjustVolume);
audio.addEventListener("timeupdate", updateSlider);
audio.addEventListener("ended", () => {
    const nextTrack = linkedList.traverse(1);
    if (nextTrack) {
        loadTrack(nextTrack);
    } else {
        playPauseIcon.classList.replace('fa-pause-circle', 'fa-play-circle');
        isPlaying = false;
    }
});

// Load track
function loadTrack(track) {
    audio.pause(); // Pause the current track
    audio.src = track.path; // Set the new track path
    audio.load(); // Load the new track
    changeTrackTitle(track.name);
    resetTimer();
    audio.play().catch(error => {
        console.error('Error playing the track:', error);
    });
    isPlaying = true;
    playPauseIcon.classList.replace('fa-play-circle', 'fa-pause-circle'); // Ensure the pause icon is displayed
    changeButtonColor();
}

// Change track title
function changeTrackTitle(title) {
    trackTitle.textContent = title;
}

// Toggle play/pause
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseIcon.classList.replace('fa-pause-circle', 'fa-play-circle');
    } else {
        audio.play().catch(error => {
            console.error('Error playing the track:', error);
        });
        playPauseIcon.classList.replace('fa-play-circle', 'fa-pause-circle');
    }
    isPlaying = !isPlaying;
}

// Adjust progress
function adjustProgress() {
    audio.currentTime = (progressSlider.value / 100) * audio.duration;
}

// Adjust volume
function adjustVolume() {
    audio.volume = volumeSlider.value / 100;
}

// Update slider
function updateSlider() {
    const value = (audio.currentTime / audio.duration) * 100;
    progressSlider.value = value || 0;
    currentTime.textContent = formatTime(audio.currentTime);
    durationTime.textContent = formatTime(audio.duration);
}

// Format time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Reset timer
function resetTimer() {
    progressSlider.value = 0;
    currentTime.textContent = "0:00";
    durationTime.textContent = "0:00";
}

// Change button color
function changeButtonColor() {
    const pos = linkedList.nodePosition();
    prevBtn.style.color = pos === 1 ? "gray" : "white";
    nextBtn.style.color = pos === -1 ? "gray" : "white";
}
