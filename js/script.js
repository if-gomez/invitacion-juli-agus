const audio = document.getElementById("background-music");

if (audio) {
  audio.volume = 0.35;

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

  function playAfterInteraction() {
    void startMusic();
  }

  interactionEvents.forEach((eventName) => {
    document.addEventListener(eventName, playAfterInteraction, { passive: true });
  });

  void startMusic();
}
