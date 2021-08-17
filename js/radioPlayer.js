export const radioPlayerInit = () => {
  console.log('Zello');

  const radio = document.querySelector('.radio'),
    radioCoverImg = document.querySelector('.radio-cover__img'),
    radioNavigation = document.querySelector('.radio-navigation'),
    radioHeaderBig = document.querySelector('.radio-header__big'),
    radioItem = document.querySelectorAll('.radio-item'),
    radioStop = document.querySelector('.radio-stop');

    const audio = new Audio();
    audio.type = 'audio/aac';

    function togglePlayStop() {
      if (audio.paused) {
        radio.classList.remove('play');
        radioStop.classList.remove('fa-stop');
        radioStop.classList.add('fa-play');
      } else {
        radio.classList.add('play');
        radioStop.classList.remove('fa-play');
        radioStop.classList.add('fa-stop');
      }
    };

    function selectStation(element) {
      radioItem.forEach(item => item.classList.remove('select'));
      element.classList.add('select');
    };

    radioStop.disabled = true;

    radioNavigation.addEventListener('change', (e) => {
      e.preventDefault();
      const parent = e.target.closest('.radio-item');
      const radioName = parent.querySelector('.radio-name').textContent;
      const radioImg = parent.querySelector('.radio-img').src;

      if (e.target && e.target.classList.contains('radio-btn')) {
        audio.src = e.target.dataset.radioStation;
        radioHeaderBig.textContent = radioName;
        radioCoverImg.src = radioImg;
        audio.play();
        radioStop.disabled = false;
        togglePlayStop();
        selectStation(parent);
      }
    });

    radioStop.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      togglePlayStop();
    });
};
