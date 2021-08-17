import { audioPlayerInit } from './audioPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';

const playerButtons = document.querySelectorAll('.player-btn'),
  playerBlocks = document.querySelectorAll('.player-block'),
  temp = document.querySelector('.temp');

/* playerButtons.forEach(button => {
 button.addEventListener('click', (e) => {
  e.preventDefault();
    console.log('Ok');
 });
}); */

function closePlayer() {
  playerButtons.forEach(item => item.classList.remove('active'));
  playerBlocks.forEach(item => item.classList.remove('active'));
  temp.style.display = 'none';
}

function openPlayer(object) {
  object.forEach((item, i) => item.addEventListener('click', (e) => {
    e.preventDefault();
    closePlayer();
    item.classList.add('active');
    playerBlocks[i].classList.add('active');
  }));
}
openPlayer(playerButtons);





videoPlayerInit();
radioPlayerInit();
audioPlayerInit();
