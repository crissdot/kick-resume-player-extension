let isFirstTime = true;
let saveTimeInLSInterval;

function waitForVideoElement() {
  const observer = new MutationObserver((mutations, me) => {
    const player = document.getElementsByTagName('video')[0];
    if (player) {
      addVideoPlayerListeners(player);
      me.disconnect();
      return;
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
}

function addVideoPlayerListeners(player) {
  player.addEventListener('play', () => {
    if (isFirstTime) {
      console.log('Setting initial time');
      player.currentTime = 8000;
      isFirstTime = false;
    }

    saveTimeInLSInterval = setInterval(() => {
      console.log('time', player.currentTime);
    }, 10000);
  });

  player.addEventListener('pause', () => {
    console.log('Video paused', saveTimeInLSInterval);
    clearInterval(saveTimeInLSInterval);
  });
}

waitForVideoElement();