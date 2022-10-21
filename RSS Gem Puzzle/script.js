let itemsNumb = 16;

let matrix = [];

let stopwatchTime = { elapsedTime: 0 };
let countMoves = 0;
let isPaused = false;
let isVolumeOn = true;

let createStructure = () => {

    const volume = document.createElement('img');
    volume.src = isVolumeOn ? './assets/volume-on.svg' : './assets/volume-off.svg';
    volume.alt = 'volume on';

    volume.addEventListener('click', (e) => {

        if (isVolumeOn) {
            isVolumeOn = false;
            e.target.src = './assets/volume-off.svg';
        } else {
            isVolumeOn = true;
            e.target.src = './assets/volume-on.svg';
        }

    })
    document.body.prepend(volume);

    const select = document.createElement('select');
    select.addEventListener('change', e => changeSize(e));
    document.body.prepend(select);

    const option3 = document.createElement('option');
    option3.value = '9';
    option3.innerHTML = `3x3`;
    select.prepend(option3);

    const option4 = document.createElement('option');
    option4.value = '16';
    // option4.defaultSelected = true;
    option4.innerHTML = `4x4`;
    select.prepend(option4);

    const option5 = document.createElement('option');
    option5.value = '25';
    option5.innerHTML = `5x5`;
    select.prepend(option5);

    const option6 = document.createElement('option');
    option6.value = '36';
    option6.innerHTML = `6x6`;
    select.prepend(option6);

    const option7 = document.createElement('option');
    option7.value = '49';
    option7.innerHTML = `7x7`;
    select.prepend(option7);

    const option8 = document.createElement('option');
    option8.value = '64';
    option8.innerHTML = `8x8`;
    select.prepend(option8);

    let allOptions = [option3, option4, option5, option6, option7, option8];
    allOptions.forEach((item) => {
        if (+item.value === itemsNumb) {
            item.defaultSelected = true;
        }
    })

    const info = document.createElement('div');
    info.classList.add('info');
    document.body.prepend(info);

    const stopwatch = document.createElement('div');
    stopwatch.classList.add('stopwatch');
    stopwatch.innerHTML = `Time: 0:00`;
    info.append(stopwatch);

    const moves = document.createElement('div');
    moves.classList.add('moves');
    moves.innerHTML = `moves: 0`;
    info.append(moves);

    const nav = document.createElement('nav');
    nav.classList.add('btn_container');
    document.body.prepend(nav);

    const btnShuffle = document.createElement('div');
    btnShuffle.classList.add('btn');
    btnShuffle.id = 'shuffle';
    btnShuffle.innerHTML = `Shuffle and start`;
    btnShuffle.addEventListener('click', () => {
        doShuffle();
        runtime();
    });
    nav.append(btnShuffle);

    const btnStop = document.createElement('div');
    btnStop.classList.add('btn');
    btnStop.id = 'stop';
    btnStop.innerHTML = `Stop`;
    btnStop.addEventListener('click', () => {
        isPaused = isPaused === false ? true : false;

        if (document.querySelector('.stopwatch').innerHTML !== 'Time: 0:00') {
            if (btnStop.innerHTML === 'Start') {
                startStopwatch();
                btnStop.innerHTML = 'Stop';
            } else {
                stopwatchTime.elapsedTime += Date.now() - stopwatchTime.startTime;
                clearInterval(stopwatchTime.intervalId);
                btnStop.innerHTML = 'Start';
            };
        };
    });
    nav.append(btnStop);

    const btnSave = document.createElement('div');
    btnSave.classList.add('btn');
    btnSave.id = 'save';
    btnSave.innerHTML = `Save`;
    btnSave.addEventListener('click', setLocalStorage);
    nav.append(btnSave);

    const btnResults = document.createElement('div');
    btnResults.classList.add('btn');
    btnResults.id = 'results';
    btnResults.innerHTML = `Results`;
    nav.append(btnResults);

    const container = document.createElement('div');
    let elemSqrt = Math.sqrt(itemsNumb);
    container.className = `container x${elemSqrt}`;
    container.addEventListener('click', findAndSwap)
    document.body.prepend(container);
}

function changeSize(e) {
    itemsNumb = +e.target.value;
    delAllItems();
    startGame();

    const container = document.querySelector('.container');

    document.querySelectorAll('option').forEach(element => {
        if (element.value === e.target.value) {
            element.defaultSelected = true;
            let elemSqrt = Math.sqrt(+element.value);
            container.className = `container x${elemSqrt}`;
        } else {
            element.defaultSelected = false;
        }
    });
}

let createItems = (numberItems = itemsNumb) => {
    const container = document.querySelector('.container');
    for (let i = 0; i < numberItems; i++) {
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = i + 1;
        item.dataset.matrixId = i + 1;
        container.append(item);
    }
    Array.from(document.querySelectorAll('.item'))[itemsNumb - 1].style.display = 'none'; //скрываем последний айтем
}

let getMatrix = (arr, itemsNumb) => {
    let sqrtOfItemsNumb = Math.sqrt(itemsNumb);

    const matrix = [];
    while (matrix.length < sqrtOfItemsNumb) {
        matrix.push([]);
    };
    let y = 0;
    let x = 0;

    for (let i = 0; i < arr.length; i++) {
        if (x >= sqrtOfItemsNumb) {
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i];
        x++;
    };

    return matrix;
}

let setPosition = (matrix) => {
    let item = Array.from(document.querySelectorAll('.item'));
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = item[value - 1];
            transform(node, x, y);
        }
    }
}
let transform = (node, x, y) => {
    const value = 115;
    node.style.transform = `translate(${x * value}%, ${y * value}%)`;
}

let shuffleArray = (arr) => {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

let doShuffle = () => {

    const flatMatrix = matrix.flat();
    const shuffle = shuffleArray(flatMatrix);
    matrix = getMatrix(shuffle, itemsNumb);

    if (checkTrueArray(matrix)) {
        setPosition(matrix);
    } else {
        doShuffle();
    }
}

function findAndSwap(e) {
    const item = e.target.closest('.item');
    if (!item) {
        return;
    };

    let findCoordinatesByNumber = (numb, matrix) => {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] === numb) {
                    return { x, y };
                }
            }
        }
        return null;
    }

    const itemNumber = Number(item.dataset.matrixId);
    const itemCoords = findCoordinatesByNumber(itemNumber, matrix);

    const emptyItemCoords = findCoordinatesByNumber(itemsNumb, matrix);

    const isValid = isValidForSwap(itemCoords, emptyItemCoords);

    if (isValid) {
        swap(itemCoords, emptyItemCoords, matrix);
        setPosition(matrix);
    }
}

let isValidForSwap = (coords1, coords2) => {
    const x = Math.abs(coords1.x - coords2.x);
    const y = Math.abs(coords1.y - coords2.y);

    return (x === 1 || y === 1) && (coords1.x === coords2.x || coords1.y === coords2.y);
}

let swap = (coords1, coords2, matrix) => {
    if (!isPaused) {
        const number = matrix[coords1.y][coords1.x];
        matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
        matrix[coords2.y][coords2.x] = number;

        outputMoves();

        if (isWon(matrix)) {
            alert(`Ура! Вы решили головоломку за ${document.querySelector('.stopwatch').innerHTML} и ${countMoves} ходов!`);
            clearTimer();
        };
        if (isVolumeOn) {
            new Audio('./assets/sound.mp3').play();
        }
    };
};

let outputMoves = () => {
    const moves = document.querySelector('.moves');
    countMoves++;
    moves.innerHTML = `moves: ${countMoves}`;
}

let isWon = (matrix) => {
    const winArray = new Array(itemsNumb).fill(0).map((_item, i) => i + 1);
    const flat = matrix.flat();
    for (let i = 0; i < winArray.length; i++) {
        if (flat[i] !== winArray[i]) {
            return false;
        }
    }
    return true;
}

let runtime = () => {
    if (document.querySelector('.stopwatch').innerHTML === 'Time: 0:00') {
        startStopwatch();
    } else {
        clearTimer();
    };
};

let clearTimer = () => {
    stopwatchTime.elapsedTime = 0;
    stopwatchTime.startTime = Date.now();
    displayTime(0, 0, 0, 0);
};

let startStopwatch = () => {
    stopwatchTime.startTime = Date.now();
    stopwatchTime.intervalId = setInterval(() => {
        const elapsedTime = Date.now() - stopwatchTime.startTime + stopwatchTime.elapsedTime;
        const milliseconds = parseInt((elapsedTime % 1000) / 10);
        const seconds = parseInt((elapsedTime / 1000) % 60);
        const minutes = parseInt((elapsedTime / (1000 * 60)) % 60);
        displayTime(minutes, seconds, milliseconds);
    }, 10);
};

let displayTime = (minutes, seconds, milliseconds) => {
    const leadZeroTime = [minutes, seconds, milliseconds].map(time => time < 10 ? `0${time}` : time);
    document.querySelector('.stopwatch').innerHTML = `Time: ${ leadZeroTime.join(':')}`;
};

let checkTrueArray = (matrix) => {
    const flatMatrix = matrix.flat();
    let count = 0;
    for (let i = 0; i < flatMatrix.length; i++) {
        for (let j = i + 1; j < flatMatrix.length; j++) {
            if (flatMatrix[i] > flatMatrix[j] && flatMatrix[i] !== flatMatrix.length && flatMatrix[j] !== flatMatrix.length) {
                count++;
            }
        };
    }

    let numEmptyRow;
    if (flatMatrix.length % 2 === 0) {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i].includes(itemsNumb)) {
                numEmptyRow = i + 1;
                count += numEmptyRow;
            }
        }
    }

    return count % 2 === 0 ? true : false;
};

let delAllItems = () => {
    const body = document.querySelector('body');
    body.innerHTML = '';
}

function startGame() {
    createStructure();
    createItems();
    matrix = getMatrix(
        Array.from(document.querySelectorAll('.item')).map((item) => Number(item.dataset.matrixId)), itemsNumb
    );
    doShuffle();
    runtime();
}

function initGame() {
    getLocalStorage();
    startGame();
}
initGame();

//функция сохраняющая значение инпута
function setLocalStorage() {
    localStorage.setItem('itemsNumb', itemsNumb);
    localStorage.setItem('matrix', JSON.stringify(matrix));
    localStorage.setItem('stopwatchTime', JSON.stringify(stopwatchTime));
    localStorage.setItem('countMoves', countMoves);
    localStorage.setItem('isPaused', isPaused);
    localStorage.setItem('isVolumeOn', isVolumeOn);
}

function getLocalStorage() {
    if (localStorage.getItem('itemsNumb')) {
        itemsNumb = +localStorage.getItem('itemsNumb');
    }
    if (localStorage.getItem('matrix')) {
        matrix = JSON.parse(localStorage.getItem('matrix'));
    }
    if (localStorage.getItem('stopwatchTime')) {
        stopwatchTime = JSON.parse(localStorage.getItem('stopwatchTime'));
    }
    if (localStorage.getItem('countMoves')) {
        countMoves = +localStorage.getItem('countMoves');
    }
    if (localStorage.getItem('isPaused')) {
        isPaused = localStorage.getItem('isPaused') === 'true';
    }
    if (localStorage.getItem('isVolumeOn')) {
        isVolumeOn = localStorage.getItem('isVolumeOn') === 'true';
    }
}