
//1 Разработка кликера: увеличение счетчика и изменение размеров изображения
const imgEl = document.getElementById('cookie');
const countEl = document.getElementById('clicker__counter');

imgEl.addEventListener('click', () => {
    countFunc();
    if (!firstTime) {
        firtsClickTime(); // Запускаем функцию только при первом клике
    };
    velocityShow();
});

//функция счетчика: изменение размеров, подсчет кликов
function countFunc() {
    let counter = Number(countEl.textContent);
    if(counter % 2 === 0) {
        imgEl.style.width = '270px';
    } else {
        imgEl.style.height = '200px';
    }
    
    setTimeout(initialSize, 250);
    
    return countEl.textContent = String(counter + 1);
};

function initialSize() {
    imgEl.style.width = '200px';
    imgEl.style.height = '127px';
};


//2 Разработка счетчика скорости клика в секунду
let firstTime; //для хранения значения времени первого клика

//Вставка элемента для отображения скорости клика
const velocityEl = document.createElement('div');
velocityEl.className = 'clicker__status';
velocityEl.innerHTML = 'Скорость клика <span id="clicker_velocity">0</span>';
document.querySelector('.clicker__status').insertAdjacentElement('afterend', velocityEl);

//Для получения времени при первом нажатии на изображение
function firtsClickTime() {
    firstTime = new Date().getTime();
};

//Для получения скорости кликов как: (количество кликов)[шт] / (время с первого клика по настоящий)[сек]
function clickingVelocity(lastTime) {
    const totalTime = (lastTime - firstTime) / 1000;
    if (totalTime > 0) {
        return Number(countEl.textContent) / totalTime;
    } else {
        return 0;
    }
};

//Реализация подсчета скорости при клике и отображение значения на странице
let velocityElCount = document.getElementById('clicker_velocity');

function velocityShow() {
    let lastTime = new Date().getTime();
    let calculatedVelocity = clickingVelocity(lastTime);
    velocityElCount.textContent = String(Number(calculatedVelocity.toFixed(2))); 
};