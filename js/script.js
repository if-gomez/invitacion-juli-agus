const audio = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

if (audio && musicToggle) {
  audio.volume = 0.35;
  let userPaused = false;

  function updateMusicToggle() {
    const isPlaying = !audio.paused;
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.setAttribute("aria-label", isPlaying ? "Pausar música" : "Reproducir música");
  }

  audio.addEventListener("play", updateMusicToggle);
  audio.addEventListener("pause", updateMusicToggle);
  updateMusicToggle();

  const interactionEvents = ["pointerdown", "touchstart", "keydown"];

  function removeInteractionListeners() {
    interactionEvents.forEach((eventName) => {
      document.removeEventListener(eventName, playAfterInteraction);
    });
  }

  async function startMusic() {
    try {
      await audio.play();
      removeInteractionListeners();
      return true;
    } catch {
      return false;
    }
  }

  function playAfterInteraction(event) {
    if (userPaused || event.target.closest?.("#music-toggle")) return;
    void startMusic();
  }

  musicToggle.addEventListener("click", () => {
    if (audio.paused) {
      userPaused = false;
      void startMusic();
    } else {
      userPaused = true;
      audio.pause();
      removeInteractionListeners();
    }
  });

  interactionEvents.forEach((eventName) => {
    document.addEventListener(eventName, playAfterInteraction, { passive: true });
  });

  void startMusic();
}
