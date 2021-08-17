export const videoPlayerInit = () => {
  console.log('Yello');

  const videoPlayer = document.querySelector('.video-player'),
    videoButtonPlay = document.querySelector('.video-button__play'),
    videoButtonStop = document.querySelector('.video-button__stop'),
    videoTimePassed = document.querySelector('.video-time__passed'),
    videoProgress = document.querySelector('.video-progress'),
    videoTimeTotal = document.querySelector('.video-time__total');

  function toggleIcon() {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.remove('fa-play');
      videoButtonPlay.classList.add('fa-pause');
    }
  }

  function togglePlay() {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
    toggleIcon();
  }
  //@ или можно задать напрямую
  //videoPlayer.addEventListener('play', toggleIcon);
  //videoPlayer.addEventListener('pause', toggleIcon);

  function stopPlay() {
    videoPlayer.pause();
    toggleIcon();
    videoPlayer.currentTime = 0;
  }

  //@ старьё
  function addZero(n) {
    if (n < 10) {
      return `0${n}`; //return '0' + n;
    } else {
      return n;
    }
  }
  //@ новый способ
  // const addZero = n => n < 10 ? '0' + n : n;

  videoPlayer.addEventListener('click', togglePlay);
  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(currentMinutes)}:${addZero(currentSeconds)}`;
    videoTimeTotal.textContent = `${addZero(durationMinutes)}:${addZero(durationSeconds)}`;

    videoProgress.value = (currentTime / duration) * 100;
  });
  videoButtonPlay.addEventListener('click', togglePlay);
  videoButtonStop.addEventListener('click', stopPlay);

  videoProgress.addEventListener('input', () => {
    const value = videoProgress.value;
    const duration = videoPlayer.duration;
    videoPlayer.currentTime = (value * duration) / 100;
  });

};