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
let haveTrueAnswer = false;

function getStarted() {
  hideName();
  hideImg();
  hideInfo();
  getRandom();
  fillAnswerItems();
  checkTrueAnswer();
  console.log(`true bird === ${birdsData[stageNumb][randomNum].name}`);
}
getStarted();

function pushBtn() {
  const btn = document.querySelector('.questions__btn');
  btn.addEventListener('click', () => {
    if (haveTrueAnswer) {
      stageNumb++;
      haveTrueAnswer = false;
      selectActiveNavItem();
      hideName();
      hideImg();
      hideInfo();
      getRandom();
      fillAnswerItems();
      checkTrueAnswer();
      console.log(`true bird === ${birdsData[stageNumb][randomNum].name}`);
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
    items[i].classList = 'questions__answer_item';
  };
};

function checkTrueAnswer() {
  const items = document.querySelectorAll('.questions__answer_item');
  items.forEach(item => {

    const name = birdsData[stageNumb][randomNum].name;
    const species = birdsData[stageNumb][randomNum].species;
    const description = birdsData[stageNumb][randomNum].description;
    const image = birdsData[stageNumb][randomNum].image;
    const audio = birdsData[stageNumb][randomNum].audio;

    item.addEventListener('click', () => {
      if (haveTrueAnswer === false) {
        if (item.innerHTML === name) {
          item.classList.add('questions__answer_item-right');
          showName(name);
          showImg(image, name);
          showInfo(name, species, description, image);
          haveTrueAnswer = true;
        } else {
          item.classList.add('questions__answer_item-wrong');
        };
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
}
// hideInfo()

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