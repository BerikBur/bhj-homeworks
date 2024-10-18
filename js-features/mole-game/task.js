//1 Установка обрабтчика события для каждого элемента 
let allElements = document.querySelectorAll('.hole'),
 deads = document.getElementById('dead'),
 losts = document.getElementById('lost');

for(let i = 0; i < allElements.length; i++) {
    allElements[i].addEventListener('click', () => handler(i));
};

//2 Функция-обработчик
function handler(index) {
    let clickedHole = document.getElementById(`hole${index + 1}`);
    
    if(clickedHole.className.includes('hole_has-mole')) {
        deads.textContent = String(Number(deads.textContent) + 1);
    } else {
        losts.textContent = String(Number(losts.textContent) + 1);
    }

    if(Number(deads.textContent) == 10) {
        alert('Вы победили! Начать заново?');
        losts.textContent = String(0);
        deads.textContent = String(0);
    };

    if(Number(losts.textContent) > 4) {
        alert(`К сожалению Вы проиграли. Начать заново?`);
        losts.textContent = String(0);
        deads.textContent = String(0);
    }
};


