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

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  document.location = '../quiz/index.html';
});
///////////////////////////////////////////////////////////////////////

let totalResult = 0;

window.addEventListener('load', () => {
  getLocalStorage();
  fillResult();
  if (totalResult === 30) {
    deleteBtn();
  }
});

function getLocalStorage() {
  if (localStorage.getItem('totalScore')) {
    totalResult = +localStorage.getItem('totalScore');
  };
};

function fillResult() {
  const resultSpan = document.getElementById('result');
  resultSpan.innerHTML = totalResult;
};

function deleteBtn() {
  const btn = document.getElementById('btn');
  const subtitle = document.querySelector('.subtitle');

  btn.style.display = 'none';
};

//////////////////////////////////////////////

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
  document.querySelectorAll('.result-link')
    .forEach(item => {
      item.innerHTML = translations[lang].linkToResult;
    });

  document.querySelector('.title')
    .innerHTML = translations[lang].title;

  document.querySelector('.part1')
    .innerHTML = translations[lang].subtitlePart1;
  document.querySelector('.part2')
    .innerHTML = translations[lang].subtitlePart2;

  document.getElementById('btn')
    .value = translations[lang].btnTry;
};