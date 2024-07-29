const LS_CACHE = 'kick_resume_player_cache';
let isFirstTime = true;
let saveTimeInLSInterval;
const videoId = window.location.href.split('kick.com/video/')[1];

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
  const cacheObject = localStorage.getItem(LS_CACHE) ? JSON.parse(localStorage.getItem(LS_CACHE)) : {};

  player.addEventListener('play', () => {
    if (isFirstTime) {
      isFirstTime = false;
      const currentTime = cacheObject[videoId];
      if (currentTime) player.currentTime = currentTime;
    }

    saveTimeInLSInterval = setInterval(() => {
      cacheObject[videoId] = parseInt(player.currentTime);
      localStorage.setItem(LS_CACHE, JSON.stringify(cacheObject));
    }, 10000);
  });

  player.addEventListener('pause', () => {
    clearInterval(saveTimeInLSInterval);
  });
}

if (!!videoId) waitForVideoElement();