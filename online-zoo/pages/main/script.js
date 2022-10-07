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

//Карусель в блоке Testimonials

import feedback from './js/feedback.js';

const inputSlider = document.querySelector('.slider');
const testimonialsWrapper = document.querySelector('.testimonials_wrapper');
const numberFeedback = 11;

let workTransformSlider = (numberStartItems = 4, valueTransform = 24.9) => {

    inputSlider.max = numberFeedback - numberStartItems; //меняет max input
    inputSlider.addEventListener('input', () => {
        console.log(inputSlider.value);

        let num = inputSlider.value * -valueTransform;
        testimonialsWrapper.style.transform = `translateX(${num}%)`

    })
}
workTransformSlider();

let width1600 = window.matchMedia("(min-width: 1600px)");
width1600.addEventListener('change', function(mm) {
    if (mm.matches) {
        workTransformSlider();
    } else {
        workTransformSlider(3, 33.76);
    }
});

if (document.documentElement.clientWidth < 1600) {
    workTransformSlider(3, 33.76);
}

const copyFeedback = () => {
    const arr = feedback.slice(); //копирую массив
    arr.sort(() => Math.random() - 0.5) //перемешиваю
    arr.sort((prev, next) => prev.time - next.time);

    console.log(arr);
    return arr.splice(0, numberFeedback); // возвращаю нужное количество отзывов
}

let arrayOfFeedback = copyFeedback();

function createItem(feedback, i) {
    const item = document.createElement('div')
    item.classList.add('testimonials__item');

    const itemUser = document.createElement('div');
    itemUser.classList.add('testimonials__item__user');
    const itemIcon = document.createElement('div');
    itemIcon.classList.add('testimonials__item__user_icon');
    const imgItemIcon = document.createElement('img');
    imgItemIcon.src = feedback[i].icon;
    imgItemIcon.alt = feedback[i].name;
    const itemName = document.createElement('div')
    itemName.classList.add('testimonials__item__user_name');
    itemName.innerHTML = feedback[i].name;
    const itemLocal = document.createElement('div');
    itemLocal.classList.add('testimonials__item__user_local');
    itemLocal.innerHTML = feedback[i].location;
    const itemDivider = document.createElement('div');
    itemDivider.classList.add('testimonials__item__user_divider');
    itemDivider.innerHTML = '•';
    const itemTime = document.createElement('div');
    itemTime.classList.add('testimonials__item__user_time');
    itemTime.innerHTML = feedback[i].time;
    const itemFeedback = document.createElement('div');
    itemFeedback.classList.add('testimonials__item_feedback');
    itemFeedback.innerHTML = feedback[i].feedback;

    item.append(itemUser);
    itemUser.append(itemIcon);
    itemIcon.append(imgItemIcon);
    itemUser.append(itemName);
    itemUser.append(itemLocal);
    itemUser.append(itemDivider);
    itemUser.append(itemTime);
    item.append(itemFeedback);

    return item;
}

for (let i = 0; i < numberFeedback; i++) {
    testimonialsWrapper.append(createItem(arrayOfFeedback, i));
}

//Попап при нажатии на отзыв в блоке Testimonials.
let popup = () => {
    const testimonialsItem = document.querySelectorAll('.testimonials__item');
    testimonialsItem.forEach((item, index) => {

        item.addEventListener('click', () => {

            const popupWrapper = document.createElement('div')
            popupWrapper.classList.add('popup_wrapper');
            popupWrapper.id = 'popup_wrapper';

            popupWrapper.append(createItem(arrayOfFeedback, index));

            const popupClose = document.createElement('div')
            popupClose.classList.add('popup_close');

            const popupCloseLine1 = document.createElement('div')
            popupCloseLine1.classList.add('popup_close_line');
            const popupCloseLine2 = document.createElement('div')
            popupCloseLine2.classList.add('popup_close_line');

            popupWrapper.append(popupClose);
            popupClose.append(popupCloseLine1);
            popupClose.append(popupCloseLine2);

            popupClose.addEventListener('click', () => { document.getElementById("popup_wrapper").remove() })
            popupWrapper.addEventListener('click', (e) => {
                const withinWrapper = e.composedPath().includes(document.querySelector('.popup_wrapper .testimonials__item'));

                if (!withinWrapper) {
                    document.getElementById("popup_wrapper").remove()
                }
            })

            return testimonialsWrapper.append(popupWrapper);
        })

    })
}

let width999 = window.matchMedia("(max-width: 999px)");
width999.addEventListener('change', function(mm) {
    if (mm.matches) {
        popup();
    }
});

if (document.documentElement.clientWidth < 1000) {
    popup();
}