// const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

// function getData(url, callback) {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.onload = function() {
//         if (xhr.status >= 200 && xhr.status < 300) {
//             const data = JSON.parse(xhr.responseText);
//             callback(data);
//         } else {
//             console.error(`Ошибка при проведении запроса: ${xhr.status}`);
//             callback(null);
//         }
//     };
//     xhr.onerror = function() {
//         console.error('Ошибка сети');
//         callback(null);
//     };
//     xhr.send();
// }

// // 3 Создать функцию обработки запрошенных данных
// function showData(data) {
//     // 0 Получить родительский элемент
//     const itemsParent = document.getElementById('items');

//     const itemCurrency = document.createElement('div');
//     itemCurrency.classList.add('item__currency');
//     itemCurrency.textContent = 'руб.';

//     // 2 Обработать объект data, согласно требованиям
//     const valutes = data.response.Valute;
//     Object.values(valutes).forEach((valute) => {
//         // 0.1 Получить элемент для дочерних элементов
//         const itemSubParent = document.createElement('div');
//         itemSubParent.classList.add('item');

//         // 1 Создать необходимые элементы
//         const itemCode = document.createElement('div');
//         itemCode.classList.add('item__code');

//         const itemValue = document.createElement('div');
//         itemValue.classList.add('item__value');

//         itemCode.textContent = valute.CharCode;
//         itemValue.textContent = String(valute.Value);

//         // 3 Добавить элементы в соответствующие родительские теги
//         itemSubParent.append(itemCode, itemValue, itemCurrency.cloneNode(true));
//         itemsParent.appendChild(itemSubParent);
//     });

//     // 5 Удалить класс loader_active
//     const loader = document.getElementById('loader');
//     loader.classList.remove('loader_active');
// }

// // 4 Вызвать функцию запроса данных и вызвать функцию обработки данных
// getData(url, showData);


/*************************************/
/*============ Fetch API implementation ============*/
/*************************************/

//1 Сохранить/получить URL
//2 Создать функцию запроса данных
//3 Создать функцию обработки запрошенных данных
//4 Вызвать функцию запроса данных и вызвать функцию обработки данных

const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

async function getData(url) {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Ошибка при проведении запроса: ${response.status}`);
        }
        const data = await response.json();
        //5 Задача - кэшировать данные
        //5.1 В функции getData кэшировать входные данные
        localStorage.setItem('cashedData', JSON.stringify(data.response.Valute));
        return data.response.Valute;
    } catch(error) {
        console.log(error);
        return null;
    }
}

//3 Создать функцию обработки запрошенных данных

function showData(data) {
    //0 Получить родительский элемент
    const itemsParent = document.getElementById('items');

    const itemCurrency = document.createElement('div');
    itemCurrency.classList.add('item__currency');
    itemCurrency.textContent = 'руб.';

    //2 Обработать объект data, согласно требованиям
    //2.1 Присвоить значения элементам
    // - задача по мере реализации:
    //отсортировать в алфавитном порядке принятые данные
    const sortedValutes = Object.values(data).sort((a, b) => {
        return a.CharCode.localeCompare(b.CharCode);
    });
    sortedValutes.forEach((valute) => {
        //0.1 Получить элемент для дочерних элементов
        const itemSubParent = document.createElement('div');
        itemSubParent.classList.add('item');
        
        //1 Создать необходимы элементы
        //1.1 Добавить классы
        const itemCode = document.createElement('div');
        itemCode.classList.add('item__code');

        const itemValue = document.createElement('div');
        itemValue.classList.add('item__value');       

        itemCode.textContent = valute.CharCode;
        itemValue.textContent = String(valute.Value); 

        //3 Добавить элементы в соответствующие родительские теги
        itemSubParent.append(itemCode, itemValue, itemCurrency.cloneNode(true));
        itemsParent.appendChild(itemSubParent);
    });

    //5 Удалить класс loader_active
    const loader = document.getElementById('loader');
    loader.classList.remove('loader_active');
}

//4 Вызвать функцию запроса данных и вызвать функцию обработки данных
//5 Задача - кэшировать данные
//5.2 При получении результатов после вызова getData
//5.2.1 сверять данные с данными кэша:
//при совпадении данных обновить данные на странице
//в противном случае отобразить данные из кэша
const cashedData = localStorage.getItem('cashedData');
let prevData = cashedData ? JSON.parse(cashedData) : null;

getData(url)
    .then(data => {
        if(data && (JSON.stringify(data) !== JSON.stringify(prevData))) {
            showData(data);
        } else if(prevData) {
            showData(prevData);
        }
    }).catch((error) => {
    console.log('Ошибка: ', error);
    });


//5 Задача - кэшировать данные
//5.1 В функции getData кэшировать входные данные
//5.2 При получении результатов после вызова getData
//сверять данные с данными кэша:
//при совпадении данных обновить данные на странице
//в противном случае отобразить данные из кэша
