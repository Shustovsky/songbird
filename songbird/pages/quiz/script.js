const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger_menu');
const wrapper = document.querySelector('.wrapper');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger-active');
  burgerMenu.classList.toggle('burger_menu-active');
})

burgerMenu.addEventListener('click', (e) => {
  const withinWrapper = e.composedPath().includes(wrapper);

  if (!withinWrapper) {
    burger.classList.toggle('burger-active');
    burgerMenu.classList.toggle('burger_menu-active');
  }
})

/////////////////////////////////////////////////////////////////////////////////////

import birdsDataRu from './js/birds.js';
import birdsDataEn from './js/birds-en.js';
import { translations } from './js/translations.js';

let currentLang = 'ru';
let birdsData;
choiceBirdsData();

let stageNumb = 0;
let randomNum;
let haveTrueAnswer = false;
let totalScore = 0;
let pointsNumb = 5;

function getStarted() {
  hideName();
  hideImg();
  hideInfo();
  showPoints();
  getRandom();
  fillAnswerItems();
  checkTrueAnswer();
  console.log(`true bird === ${birdsData[stageNumb][randomNum].name}`);
}
getStarted();

function pushBtn() {
  const btn = document.querySelector('.questions__btn');
  const playerCurrent = document.getElementById('current_player');
  const playerDscr = document.getElementById('description_player');

  btn.addEventListener('click', () => {
    if (haveTrueAnswer) {
      stageNumb++;
      haveTrueAnswer = false;
      selectActiveNavItem();
      hideName();
      hideImg();
      hideInfo();
      getRandom();
      clearAnswerItems();
      fillAnswerItems();
      changeSrcPlayer(audioCurrent, birdsData[stageNumb][randomNum].audio);
      stopSound(audioCurrent, playerCurrent);
      stopSound(audioDscr, playerDscr);
      console.log(`true bird === ${birdsData[stageNumb][randomNum].name}`);
      removeClassToBtn();
    };
  });
};
pushBtn();

function selectActiveNavItem() {
  const navItems = document.querySelectorAll('.questions__list_item');
  navItems.forEach((item, index) => {
    if (index === stageNumb) {
      item.classList.add('questions__list_item-active');
    } else {
      item.classList = 'questions__list_item';
    };
  });
};
selectActiveNavItem();

function getRandom() {
  let maxValue = birdsData.length;
  let random = Math.random() * maxValue;
  randomNum = Math.floor(random);
};

function fillAnswerItems() {
  const items = document.querySelectorAll('.questions__answer_item');
  for (let i = 0; i < items.length; i++) {
    items[i].innerHTML = `${birdsData[stageNumb][i].name}`;
    // items[i].classList = 'questions__answer_item';
    items[i].setAttribute('data-id', i);
  };
};

function clearAnswerItems() {
  const items = document.querySelectorAll('.questions__answer_item');
  items.forEach(item => {
    item.classList = 'questions__answer_item';
  });
};

let choiceAnswerItem;

function checkTrueAnswer() {
  const items = document.querySelectorAll('.questions__answer_item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      choiceAnswerItem = item.getAttribute('data-id');
      const name = birdsData[stageNumb][choiceAnswerItem].name;
      const species = birdsData[stageNumb][choiceAnswerItem].species;
      const description = birdsData[stageNumb][choiceAnswerItem].description;
      const image = birdsData[stageNumb][choiceAnswerItem].image;
      const audio = birdsData[stageNumb][choiceAnswerItem].audio;

      const playerCurrent = document.getElementById('current_player');
      const playerDscr = document.getElementById('description_player');
      if (haveTrueAnswer === false) {
        if (item.innerHTML === birdsData[stageNumb][randomNum].name) {
          item.classList.add('questions__answer_item-right');
          showName(name);
          showImg(image, name);
          showInfo(name, species, description, image);
          haveTrueAnswer = true;
          calcPoints();
          showPoints();
          playRightSound();
          stopSound(audioCurrent, playerCurrent);
          pointsNumb = 5;
          changeSrcPlayer(audioDscr, audio);
          stopSound(audioDscr, playerDscr);
          addClassToBtn();
          if (stageNumb === 5) { // 5 -это номер последнего раунда
            setTimeout(goResultPage, 500);
          };
        } else {
          if (!item.classList.contains('questions__answer_item-wrong')) {
            item.classList.add('questions__answer_item-wrong');
            showInfo(name, species, description, image);
            pointsNumb--;
            playWrongSound();
            changeSrcPlayer(audioDscr, audio);
            stopSound(audioDscr, playerDscr);
          } else {
            showInfo(name, species, description, image);
          };
        };
      } else {
        showInfo(name, species, description, image);
      };
    });
  });
};

function hideName() {
  const name = document.querySelector('.questions__current_name');
  name.innerHTML = '******';
};

function showName(answer) {
  const name = document.querySelector('.questions__current_name');
  name.innerHTML = `${answer}`;
};

function hideImg() {
  const img = document.querySelector('.questions__current_img img');
  img.src = '../../assets/images/default_bird.jpg';
  img.alt = 'unknown bird';
};

function showImg(path, alt) {
  const img = document.querySelector('.questions__current_img img');
  img.src = `${path}`;
  img.alt = `${alt}`;
};

function hideInfo() {
  const helpSection = document.querySelector('.help');
  const descriptionSection = document.querySelector('.description');
  helpSection.style.display = 'block';
  descriptionSection.style.display = 'none';
};

function showInfo(name, species, description, image) {
  const helpSection = document.querySelector('.help');
  const descriptionSection = document.querySelector('.description');
  helpSection.style.display = 'none';
  descriptionSection.style.display = 'inline-grid';

  const imgItem = document.querySelector('.description_img img');
  const nameItem = document.querySelector('.description_name');
  const speciesItem = document.querySelector('.description_species');
  const dscrItem = document.querySelector('.description_dscr');

  imgItem.src = `${image}`;
  imgItem.alt = `${name}`;
  nameItem.innerHTML = `${name}`;
  speciesItem.innerHTML = `${species}`;
  dscrItem.innerHTML = `${description}`;
};

function calcPoints() {
  totalScore += pointsNumb;
};

function showPoints() {
  const scorePoint = document.querySelector('.header_score_point');
  scorePoint.innerHTML = totalScore;
};

function playRightSound() {
  new Audio('./../../assets/sound/right-sound.mp3').play();
};

function playWrongSound() {
  new Audio('./../../assets/sound/wrong-sound.mp3').play();
};

const audioCurrent = new Audio();
audioCurrent.src = birdsData[stageNumb][randomNum].audio;

const audioDscr = new Audio();

function player(id, sound) {
  const audioPlayer = document.getElementById(id);
  const audio = sound;

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
player('current_player', audioCurrent);
player('description_player', audioDscr);

function stopSound(audio, path) {
  audio.pause();
  path.querySelector('.play').innerHTML = `▶`;
};

function changeSrcPlayer(audio, src) {
  audio.src = src;
};

function addClassToBtn(action) {
  const btn = document.querySelector('.questions__btn');
  btn.classList.add('questions__btn-active');
};

function removeClassToBtn(action) {
  const btn = document.querySelector('.questions__btn');
  btn.classList.remove('questions__btn-active');
};

function goResultPage() {
  document.location = '../result/index.html';
};

window.addEventListener('beforeunload', () => {
  localStorage.setItem('totalScore', totalScore);
});

///////////////////////////////////////////////////

const btnLang = document.querySelectorAll('.lang');
btnLang.forEach(btn => {
  btn.addEventListener('click', switchLang);
});

window.addEventListener('load', () => {
  if (localStorage.getItem('lang')) {
    currentLang = localStorage.getItem('lang');
  };
  changeLang(currentLang);
});

function switchLang() {
  currentLang = currentLang === 'en' ? 'ru' : 'en';

  localStorage.setItem('lang', currentLang);
  changeLang(currentLang);
  choiceBirdsData();
  fillAnswerItems();
  if (document.querySelector('.help').style.display !== 'block') {
    const name = birdsData[stageNumb][choiceAnswerItem].name;
    const species = birdsData[stageNumb][choiceAnswerItem].species;
    const description = birdsData[stageNumb][choiceAnswerItem].description;
    const image = birdsData[stageNumb][choiceAnswerItem].image;
    showInfo(name, species, description, image);
    if (haveTrueAnswer === true) {
      showName(name);
    }
  };
};

function changeLang(lang) {
  document.querySelector('.header_score_name')
    .innerHTML = translations[lang].score;

  document.querySelectorAll('.lang')
    .forEach(item => {
      item.innerHTML = translations[lang].langBtn;
    });

  document.querySelectorAll('.main-link')
    .forEach(item => {
      item.innerHTML = translations[lang].linkToMain;
    });
  document.querySelectorAll('.quiz-link')
    .forEach(item => {
      item.innerHTML = translations[lang].linkToQuiz;
    });
  document.querySelectorAll('.gallery-link')
    .forEach(item => {
      item.innerHTML = translations[lang].linkToGallery;
    });

  const stagesOfGame = document.querySelectorAll('.questions__list_item')
  for (let i = 0; i < stagesOfGame.length; i++) {
    stagesOfGame[i].innerHTML = translations[lang].stage[i]
  };

  document.querySelector('.questions__btn')
    .innerHTML = translations[lang].btnNext;

  document.querySelector('.help')
    .innerHTML = translations[lang].help;
};

function choiceBirdsData() {
  if (localStorage.getItem('lang')) {
    if (localStorage.getItem('lang') === 'ru') {
      birdsData = birdsDataRu;
    } else {
      birdsData = birdsDataEn;
    };
  } else {
    birdsData = birdsDataRu;
  };
};