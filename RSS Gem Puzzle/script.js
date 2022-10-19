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