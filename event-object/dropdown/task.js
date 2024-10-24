let selectedValue = document.querySelector('.dropdown__value');
let list = document.querySelector('.dropdown__list');
let items = document.querySelectorAll('.dropdown__link');

selectedValue.addEventListener('click', dropList);
items.forEach((item, idx) => item.addEventListener('click', (event) => {
    event.preventDefault();
    setItem(idx);
}));

function dropList() {
    list.classList.toggle('dropdown__list_active');
};

function setItem(idx) {
    selectedValue.textContent = items[idx].textContent;
    list.classList.remove('dropdown__list_active');
};
