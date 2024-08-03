function togglePlayPause() {
  if (isPlaying) pauseTrack();
  else playTrack();
}

function playTrack() {
  audio.play().then(() => {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }).catch(error => {
    console.error("Error playing the track:", error);
  });
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function changeTrackTitle(name) {
  trackTitle.textContent = name;
}

function resetTimer() {
  currentTime.textContent = "00:00";
  durationTime.textContent = "00:00";
  progressSlider.value = 0;
}

function updateSlider() {
  if (audio.duration) {
    const position = (audio.currentTime / audio.duration) * 100;
    progressSlider.value = position;
    updateTime();
  } else {
    resetTimer();
    pauseTrack();
  }
}

function updateTime() {
  const curr = formatTime(audio.currentTime);
  const dur = formatTime(audio.duration);
  currentTime.textContent = curr;
  durationTime.textContent = dur;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function adjustVolume() {
  audio.volume = volumeSlider.value / 100;
}

function adjustProgress() {
  audio.currentTime = (progressSlider.value / 100) * audio.duration;
}

function changeButtonColor() {
  const pos = linkedList.nodePosition();
  prevBtn.style.color = pos === 1 ? "gray" : "white";
  nextBtn.style.color = pos === -1 ? "gray" : "white";
}
