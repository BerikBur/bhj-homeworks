const tabElements = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab__content');

tabElements.forEach((el, idx) => el.addEventListener('click', () => addRemoveClass(idx)));

function addRemoveClass(idx) {
    tabElements.forEach(el => el.classList.remove('tab_active'));
    tabElements[idx].classList.add('tab_active');

    tabContents.forEach(el => el.classList.remove('tab__content_active'));
    tabContents[idx].classList.add('tab__content_active');
}