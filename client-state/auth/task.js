const signingInfo = document.querySelector('#signin');
const formEl = document.querySelector('#signin__form');
const url = formEl.action;
const card = document.querySelector('.card');
const welcomeWindow = document.querySelector('.welcome');
const welcomeUserId = document.querySelector('#user_id');

formEl.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const login = formData.get('login');
    const password = formData.get('password');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password})    
        });

        if(!response.ok) {
            const notTrueLogin = document.createElement('div');
            notTrueLogin.id = 'error_message';
            if(!document.querySelector('#error_message')) {
                notTrueLogin.textContent = 'Неверный логин/пароль';
                card.appendChild(notTrueLogin);
            }
            
            setTimeout(function() {
                notTrueLogin.remove();
            }, 3000);

            return;
        };

        const data = await response.json();

        const userId = data.user_id;
        
        welcomeUserId.textContent = userId;
        welcomeWindow.classList.add('welcome_active');

        localStorage.setItem('userId', userId);

        signingInfo.style.display = 'none';

        addLogOutBtn();
        
        event.target.reset();
    } catch(error) {
        console.log('Ошибка:', error);
    };

})

function addLogOutBtn() {
    const btnLogOut = document.createElement('button');
    btnLogOut.classList.add('btn');
    btnLogOut.textContent = 'Выйти';
    btnLogOut.style.marginTop = '10px';
    card.appendChild(btnLogOut);

    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';

    btnLogOut.addEventListener('click', () => {
        welcomeWindow.classList.remove('welcome_active');
        signingInfo.style.display = 'block';
        card.style.display = 'block';
        btnLogOut.remove();
        localStorage.removeItem('userId');
    });
}

window.onload = () => {
    const userId = localStorage.getItem('userId');
    if(userId) {
        signingInfo.style.display = 'none';
        welcomeUserId.textContent = userId;
        welcomeWindow.classList.add('welcome_active');
        addLogOutBtn();
    }
}
