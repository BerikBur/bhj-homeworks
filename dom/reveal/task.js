const elementsRevealed = document.querySelectorAll('.reveal');

function isElementHere(el) {
    const rect = el.getBoundingClientRect();
    const elHeight = rect.top - rect.bottom;

    return (rect.top < window.innerHeight && rect.bottom > 0);
};

function showFunc() {
    elementsRevealed.forEach(el => {
        if(isElementHere(el)) {
            el.classList.add('reveal_active');
        } else {
            el.classList.remove('reveal_active');
        }
    })
}

showFunc();

window.addEventListener('scroll', showFunc);


