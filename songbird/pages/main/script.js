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

const btnPlay = document.getElementById('btn');
btnPlay.addEventListener('click', () => {
  document.location = '../quiz/index.html';
});

///////////////////////////////////////////////////////////////////

import { translations } from './js/translations.js';

let currentLang = 'ru';

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
};

function changeLang(lang) {
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

  document.querySelector('.title').innerHTML = translations[lang].title;
  document.querySelector('.subtitle').innerHTML = translations[lang].subtitle;

  document.querySelector('.rules_dscr').innerHTML = translations[lang].rulesDscr;

  const rulesList = document.querySelector('.rules');
  rulesList.innerHTML = '';
  for (let i = 0; i < translations[lang].rulesListItems.length; i++) {

    const rulesItems = document.createElement('li');
    rulesItems.classList.add('rules_item');
    rulesItems.innerHTML = translations[lang].rulesListItems[i];
    rulesList.append(rulesItems);
  };

  document.getElementById('btn').value = translations[lang].btnPlay;
};