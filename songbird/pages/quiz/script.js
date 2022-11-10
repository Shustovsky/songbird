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

import birdsData from './js/birds.js';



let stageNumb = 0;
let randomNum;

const btn = document.querySelector('.questions__btn');
btn.addEventListener('click', () => {
  stageNumb++;
  selectActiveNavItem();
  hideName();
  hideImg();
  fillAnswerItems();


  console.log(`true bird === ${birdsData[stageNumb][randomNum].name}`);
});

function getStarted() {
  hideName();
  hideImg();
  getRandom();
  fillAnswerItems();
  checkTrueAnswer();
  console.log(`true bird === ${birdsData[stageNumb][randomNum].name}`);
}
getStarted();

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
    items[i].classList = 'questions__answer_item';
  };
};

function checkTrueAnswer() {
  const items = document.querySelectorAll('.questions__answer_item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      if (item.innerHTML === birdsData[stageNumb][randomNum].name) {
        item.classList.add('questions__answer_item-right');
        showName(birdsData[stageNumb][randomNum].name);
        showImg(birdsData[stageNumb][randomNum].image, birdsData[stageNumb][randomNum].name);
      } else {
        item.classList.add('questions__answer_item-wrong');
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