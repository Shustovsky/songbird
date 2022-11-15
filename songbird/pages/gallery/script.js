const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger_menu');
const wrapper = document.querySelector('.wrapper');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger-active');
  burgerMenu.classList.toggle('burger_menu-active');
});

burgerMenu.addEventListener('click', (e) => {
  const withinWrapper = e.composedPath().includes(wrapper);

  if (!withinWrapper) {
    burger.classList.toggle('burger-active');
    burgerMenu.classList.toggle('burger_menu-active');
  };
});

///////////////////////////////////////////////////////////////////////

import birdsData from './js/birds.js';

function startPage() {
  let countItems = 0;
  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      const name = birdsData[i][j].name;
      const species = birdsData[i][j].species;
      const description = birdsData[i][j].description;
      const image = birdsData[i][j].image;
      const audio = birdsData[i][j].audio;


      createItem(countItems);
      fillItem(countItems, name, species, description, image);
      player(countItems, audio);
      countItems++;
    };
  };
};
startPage();

function createItem(id) {
  const container = document.querySelector('.items__container');

  const item = document.createElement('div');
  item.classList.add('item');
  item.setAttribute('data-id', id);
  container.append(item);

  const itemImg = document.createElement('div');
  itemImg.classList.add('item_img');
  item.append(itemImg);

  const img = document.createElement('img');
  itemImg.append(img);

  const itemName = document.createElement('div');
  itemName.classList.add('item_name');
  item.append(itemName);

  const itemSpecies = document.createElement('div');
  itemSpecies.classList.add('item_species');
  item.append(itemSpecies);

  const player = document.createElement('div');
  player.classList.add('player');
  item.append(player);

  const play = document.createElement('button');
  play.classList.add('play');
  play.innerHTML = '▶';
  player.append(play);

  const timeline = document.createElement('div');
  timeline.classList.add('timeline');
  player.append(timeline);

  const progress = document.createElement('div');
  progress.classList.add('progress');
  timeline.append(progress);

  const time = document.createElement('div');
  time.classList.add('time');
  timeline.append(time);

  const current = document.createElement('div');
  current.classList.add('current');
  time.append(current);

  const length = document.createElement('div');
  length.classList.add('length');
  time.append(length);

  const volumeContainer = document.createElement('div');
  volumeContainer.classList.add('volume__container');
  player.append(volumeContainer);

  const volume = document.createElement('div');
  volume.classList.add('volume');
  volumeContainer.append(volume);

  const volumeImg = document.createElement('img');
  volumeImg.classList.add('volume_img');
  volumeImg.src = '../../assets/icons/volume-on.png';
  volumeImg.alt = 'volume on';
  volume.append(volumeImg);

  const volumeInput = document.createElement('input');
  volumeInput.classList.add('sound-volume');
  volumeInput.type = 'range';
  volumeInput.min = '0';
  volumeInput.max = '1';
  volumeInput.step = '0.01';
  volumeContainer.append(volumeInput);

  const itemDscr = document.createElement('div');
  itemDscr.classList.add('item_dscr');
  item.append(itemDscr);
};

function fillItem(id, name, species, description, image) {

  const itemId = document.querySelector(`[data-id='${id}']`);

  const imgItem = itemId.querySelector('.item_img img');
  const nameItem = itemId.querySelector('.item_name');
  const speciesItem = itemId.querySelector('.item_species');
  const dscrItem = itemId.querySelector('.item_dscr');

  imgItem.src = `${image}`;
  imgItem.alt = `${name}`;
  nameItem.innerHTML = `${name}`;
  speciesItem.innerHTML = `${species}`;
  dscrItem.innerHTML = `${description}`;
};

function player(id, sound) {
  const audioPlayer = document.querySelector(`[data-id='${id}'] .player`);
  // const audioPlayer = document.getElementById(id);
  const audio = new Audio(sound);

  audio.addEventListener('loadeddata', () => {
    audioPlayer.querySelector('.time .length').textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = 0.75;
  }, false);

  const timeline = audioPlayer.querySelector('.timeline');
  timeline.addEventListener('click', e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
  }, false);

  const soundVolume = audioPlayer.querySelector('.sound-volume');

  soundVolume.addEventListener('input', () => {
    audio.volume = soundVolume.value;
  });

  let restoreValue;

  const volumeBtn = audioPlayer.querySelector('.volume');
  volumeBtn.addEventListener('click', muter);

  function muter() {
    // let volumeImg = document.querySelector('.volume').classList.toggle('volume-off');
    let volumeImg = audioPlayer.querySelector('.volume_img');
    if (soundVolume.value === '0') {
      audio.volume = restoreValue;
      soundVolume.value = restoreValue;
      volumeImg.src = '../../assets/icons/volume-on.png';
      volumeImg.alt = 'volume on';
    } else {
      restoreValue = soundVolume.value;
      audio.volume = 0;
      soundVolume.value = 0;
      volumeImg.src = '../../assets/icons/volume-off.png';
      volumeImg.alt = 'volume off';
    };
  };

  setInterval(() => {
    const progressBar = audioPlayer.querySelector('.progress');
    progressBar.style.width = audio.currentTime / audio.duration * 100 + '%';
    audioPlayer.querySelector('.time .current').textContent = getTimeCodeFromNum(
      audio.currentTime
    );
  }, 500);

  const playBtn = audioPlayer.querySelector('.play');
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      playBtn.innerHTML = `II`;
      audio.play();
    } else {
      playBtn.innerHTML = `▶`;
      audio.pause();
    }
  }, false);

  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
  };
};