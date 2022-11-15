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

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  document.location = '../quiz/index.html';
});
///////////////////////////////////////////////////////////////////////

let totalResult = 0;

window.addEventListener('load', () => {
  getLocalStorage();
  if (totalResult === 30) {
    ifWon();
  } else {
    fillResult();
    console.log(totalResult);
  };
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

function ifWon() {
  const btn = document.getElementById('btn');
  const subtitle = document.querySelector('.subtitle');

  btn.style.display = 'none';
  subtitle.innerHTML = 'Вы прошли викторину и набрали 30 из 30 возможных баллов';
};