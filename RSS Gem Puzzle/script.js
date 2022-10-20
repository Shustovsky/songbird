let itemsNumb = 9;
let createStructure = () => {
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