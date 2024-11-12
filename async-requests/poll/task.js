const url = 'https://students.netoservices.ru/nestjs-backend/poll';
const pollAnswers = document.querySelector('.poll__answers');

//Запрос на получение данных опроса
async function getData(url) {
    try{
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Ошибка ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log(error);
    }; 
}

//Обработка данных для опроса 
//Объявление слушателя событий и обработчика данных статистики
async function addData() {
    const data = await getData(url);

    const title = document.querySelector('.poll__title');
    title.textContent = data.data.title;
    
    data.data.answers.forEach((answer, idx) => {
        const btnAnswer = document.createElement('button');
        btnAnswer.classList.add('poll__answer');
        btnAnswer.textContent = answer;
        btnAnswer.addEventListener('click', () => chooseFunc(data, idx))
        pollAnswers.appendChild(btnAnswer);
    })   
}

//Обработка данных опроса и отображение на странице
//Запрос на статистики опроса
function chooseFunc(data, idx) {
    const main = document.querySelector('.content');
    main.insertAdjacentHTML('beforeend', `
        <div id="modal" class="modal">
            <div class="modal-content">
                <h3>Спасибо, Ваш голос засчитан!</h3>
                <button class="poll__answer" id="closeModal">Закрыть</button>
            </div>
        </div>
        `);
    const btnClose = document.querySelector('#closeModal');
    btnClose.addEventListener('click', async () => {
        const modalWindow = document.querySelector('#modal');
        modalWindow.remove();

        const params = new URLSearchParams();
        params.append('vote', data.id);
        params.append('answer', idx);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString()
            });
            if(!response.ok) {
                throw new Error(`Ошибка, статус ответа: ${response.status}`);
            };

            const statData = await response.json();
            showStat(statData);
        } catch(error) {
            console.log(error);
        }
    })
}

//Отображение данных статистики
function showStat(statData) {
    pollAnswers.classList.remove('poll__answers_active');
    const poll = document.querySelector('.poll');
    statData.stat.forEach(answer => {
        poll.insertAdjacentHTML('beforeend', `
            <div>
                ${answer.answer}: ${answer.votes}
            </div>
            `);
    });
}

addData();