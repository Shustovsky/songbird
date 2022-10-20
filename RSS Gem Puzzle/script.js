let createStructure = () => {

    const select = document.createElement('select');
    document.body.prepend(select);

    const option3 = document.createElement('option');
    option3.value = '9';
    option3.innerHTML = `3x3`;
    select.prepend(option3);

    const option4 = document.createElement('option');
    option4.value = '16';
    option4.defaultSelected = true;
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
    nav.append(btnShuffle);

    const btnStop = document.createElement('div');
    btnStop.classList.add('btn');
    btnStop.id = 'stop';
    btnStop.innerHTML = `Stop`;
    nav.append(btnStop);

    const btnSave = document.createElement('div');
    btnSave.classList.add('btn');
    btnSave.id = 'save';
    btnSave.innerHTML = `Save`;
    nav.append(btnSave);

    const btnResults = document.createElement('div');
    btnResults.classList.add('btn');
    btnResults.id = 'results';
    btnResults.innerHTML = `Results`;
    nav.append(btnResults);

    const container = document.createElement('div');
    container.classList.add('container', 'x4');

    document.body.prepend(container);
}
createStructure();

let itemsNumb = 16;
// let selectedSize = document.querySelectorAll('option');
// selectedSize.forEach(item => {
//     if (item.selected === true) {
//         itemsNumb = item.value;
//     };
// });

document.querySelector("select").addEventListener('change', e => {
    console.log("Changed to: " + e.target.value);
    itemsNumb = e.target.value;
    console.log(itemsNumb);

})


let createItems = (numberItems = itemsNumb) => {
    const container = document.querySelector('.container');
    for (let i = 0; i < numberItems; i++) {
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = i + 1;
        item.dataset.matrixId = i + 1;
        container.append(item);
    }
}
createItems();

const container = document.querySelector('.container');
const item = Array.from(document.querySelectorAll('.item')); //Array.from превращаем в массив

item[itemsNumb - 1].style.display = 'none';

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
    }
    return matrix;
}

let matrix = getMatrix(
    item.map((item) => Number(item.dataset.matrixId)), itemsNumb
);

let setPosition = (matrix) => {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            // console.log(value)
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
    const shuffle = shuffleArray(flatMatrix)
    matrix = getMatrix(shuffle, itemsNumb);
    setPosition(matrix);
}
setPosition(matrix); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
// doShuffle();

document.getElementById('shuffle').addEventListener('click', doit = () => {
    doShuffle();
    // console.log(matrix);
    console.log(checkTrueArray(matrix));
    if (checkTrueArray(matrix)) {
        runtime();
    } else {
        doit();
    }

});

container.addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (!item) {
        return;
    }

    const itemNumber = Number(item.dataset.matrixId);
    const itemCoords = findCoordinatesByNumber(itemNumber, matrix);
    const emptyItemCoords = findCoordinatesByNumber(itemsNumb, matrix);

    const isValid = isValidForSwap(itemCoords, emptyItemCoords);

    if (isValid) {
        swap(itemCoords, emptyItemCoords, matrix);
        setPosition(matrix);
    }
})

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
            console.log(`Ура! Вы решили головоломку за ${time.innerHTML} и ${countMoves} ходов!`);
            clearTimer();
        };
        new Audio('./assets/sound.mp3').play();
    };
};

let countMoves = 0;
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

const time = document.querySelector('.stopwatch');
const stopwatch = { elapsedTime: 0 };

let runtime = () => {
    if (time.innerHTML === 'Time: 0:00') {
        startStopwatch();
    } else {
        clearTimer();
    };
};

let clearTimer = () => {
    stopwatch.elapsedTime = 0;
    stopwatch.startTime = Date.now();
    displayTime(0, 0, 0, 0);
};

let startStopwatch = () => {
    stopwatch.startTime = Date.now();
    stopwatch.intervalId = setInterval(() => {

        const elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime;
        const milliseconds = parseInt((elapsedTime % 1000) / 10);
        const seconds = parseInt((elapsedTime / 1000) % 60);
        const minutes = parseInt((elapsedTime / (1000 * 60)) % 60);
        displayTime(minutes, seconds, milliseconds);
    }, 10);
};

let displayTime = (minutes, seconds, milliseconds) => {
    const leadZeroTime = [minutes, seconds, milliseconds].map(time => time < 10 ? `0${time}` : time);
    time.innerHTML = `Time: ${ leadZeroTime.join(':')}`;
};

const stopBtn = document.getElementById('stop');
let isPaused = false;
stopBtn.addEventListener('click', () => {
    isPaused = isPaused === false ? true : false;
    console.log(isPaused);
    if (time.innerHTML !== 'Time: 0:00') {
        if (stopBtn.innerHTML === 'Start') {
            startStopwatch();
            stopBtn.innerHTML = 'Stop';
        } else {
            stopwatch.elapsedTime += Date.now() - stopwatch.startTime;
            clearInterval(stopwatch.intervalId);
            stopBtn.innerHTML = 'Start';
        };
    };
});


let checkTrueArray = (matrix) => {
    const flatMatrix = matrix.flat();
    let count = 0;
    console.log(flatMatrix);
    for (let i = 0; i < flatMatrix.length; i++) {
        // console.log(`i = ${flatMatrix[i]}`);
        for (let j = i + 1; j < flatMatrix.length; j++) {
            // console.log(j);
            if (flatMatrix[i] > flatMatrix[j] && flatMatrix[i] !== flatMatrix.length && flatMatrix[j] !== flatMatrix.length) {
                count++;
                // console.log(`--------j = ${flatMatrix[j]}`);
                // console.log(count);
            }
        };
    }

    let numEmptyRow;
    // console.log(numEmptyRow);
    if (flatMatrix.length % 2 === 0) {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i].includes(itemsNumb)) {
                numEmptyRow = i + 1;
            }
        }
        count += numEmptyRow;
    }

    // console.log(`count === ${count}`)
    return count % 2 === 0 ? true : false;
}