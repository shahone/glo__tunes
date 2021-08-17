export const audioPlayerInit = () => {
  const audio = document.querySelector('.audio'),
        audioImg = document.querySelector('.audio-img'),
        audioHeader = document.querySelector('.audio-header'),
        audioPlayer = document.querySelector('.audio-player'),
        audioNavigation = document.querySelector('.audio-navigation'),
        audioButtonPlay = document.querySelector('.audio-button__play'),
        audioTimePassed = document.querySelector('.audio-time__passed'),
        audioProgress = document.querySelector('.audio-progress'),
        audioProgressTiming = document.querySelector('.audio-progress__timing'),
        audioTimeTotal = document.querySelector('.audio-time__total');

  const playlist = ['hello', 'flow', 'speed'];
  let trackIndex = 0;

  function loadTrack() {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];
    audioImg.src = `./audio/${track}.jpg`;
    audioPlayer.src = `./audio/${track}.mp3`;
    audioHeader.textContent = track.toLocaleUpperCase();

    if (isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  function nextTrack() {
    if (trackIndex === playlist.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
  };

  const addZero = n => n < 10 ? '0' + n : n;

  audioNavigation.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play');
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      const track = playlist[trackIndex];
      audioHeader.textContent = track.toLocaleUpperCase();
    }

    if (e.target && e.target.classList.contains('audio-button__prev')) {
      if (trackIndex !== 0) {
        trackIndex--;
      } else {
        trackIndex = playlist.length - 1;
      }
      loadTrack();

    }

    if (e.target && e.target.classList.contains('audio-button__next')) {
      nextTrack();
      loadTrack();

    }
  });

  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    loadTrack();
    audioPlayer.play();
  });

  audioPlayer.addEventListener('timeupdate', () => {
    const duration = audioPlayer.duration,
      current = audioPlayer.currentTime,
      progress = (current / duration) * 100;

    audioProgressTiming.style.width = progress + '%';

    let currentMinutes = Math.floor(current / 60) || '0';
    let currentSeconds = Math.floor(current % 60) || '0';
    let durationMinutes = Math.floor(duration / 60) || '0';
    let durationSeconds = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(currentMinutes)}:${addZero(currentSeconds)}`;
    audioTimeTotal.textContent = `${addZero(durationMinutes)}:${addZero(durationSeconds)}`;
  });

  audioProgress.addEventListener('click', e => {
    const x = e.offsetX,
      width = audioProgress.clientWidth,
      progress = (x / width) * audioPlayer.duration;
      audioPlayer.currentTime = progress;
  });



};