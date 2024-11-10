const textArea = document.getElementById('editor');
textArea.addEventListener('input', () => {
    localStorage.setItem('textStorage', textArea.value);
})


window.onload = checkAddText();
function checkAddText() {
    const textStorage = localStorage.getItem('textStorage');
    if(textStorage) {
        textArea.value = textStorage;
    }; 
};

/*======= Кнопка очистки текста =======*/
const buttonClear = document.createElement('button');
buttonClear.innerHTML = 'Очистить текст';

const cardParent = document.querySelector('.card');

buttonClear.addEventListener('click', () => {
    textArea.value = '';
    localStorage.removeItem('textStorage');
});

cardParent.appendChild(buttonClear);




