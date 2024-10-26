const buttons = document.querySelectorAll('.font-size');
const bookContent = document.querySelector('.book__content');

buttons.forEach((el, idx) => {
    const attr = el.getAttribute('data-size');
    el.addEventListener('click', (event) => changeFtSize(event, attr, idx))
});

function changeFtSize(event, attr, idx) {
    event.preventDefault();

    buttons.forEach(el => el.classList.remove('font-size_active'));
    buttons[idx].classList.add('font-size_active');

    bookContent.classList.remove('font-size_small', 'font-size_big');
    if(attr) {
        bookContent.classList.add(`font-size_${attr}`);
    };  
}

const elementsText = document.querySelectorAll('[class*="text_color"]');
elementsText.forEach((el, idx) => {
    const attr = el.getAttribute('data-text-color');
    el.addEventListener('click', (event) => changeTextColor(event, attr, idx));
});

function changeTextColor(event, attr, idx) {
    event.preventDefault();

    elementsText.forEach(el => el.classList.remove('color_active'));
    elementsText[idx].classList.add('color_active');

    bookContent.classList.forEach(style => {
        if(style.startsWith('book_color') && style !== `book_color-${attr}`) {
            bookContent.classList.remove(style);
        }
    })
    
    if(attr) {
        bookContent.classList.add(`book_color-${attr}`);
    };
};

const elementsBack = document.querySelectorAll('[class*="bg_color"]');
elementsBack.forEach((el, idx) => {
    const attr = el.getAttribute('data-bg-color');
    el.addEventListener('click', (event) => changeBackColor(event, attr, idx));
});

function changeBackColor(event, attr, idx) {
    event.preventDefault();

    elementsBack.forEach(el => el.classList.remove('color_active'));
    elementsBack[idx].classList.add('color_active');

    bookContent.classList.forEach(style => {
        if(style.startsWith('bg_color') && style !== `bg_color_${attr}`) {
            bookContent.classList.remove(style);
        }
    })
    
    if(attr) {
        bookContent.classList.add(`bg_color_${attr}`);
    };
};


