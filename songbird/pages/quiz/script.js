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

console.log(birdsData);

let stageNumb = 0;
let randomNum;

const btn = document.querySelector('.questions__btn');
btn.addEventListener('click', () => {
  stageNumb++;
  selectActiveNavItem();
});

function getStarted() {
  getRandom();


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
}