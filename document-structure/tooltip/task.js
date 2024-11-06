const tooltipElements = document.querySelectorAll('.has-tooltip');

tooltipElements.forEach(el => el.addEventListener('click', (event) => {
        event.stopPropagation();   
        tipFunc(event, el);
    })
);

function tipFunc(e, el) {
    e.preventDefault();

    const tipsList = document.querySelectorAll('.tooltip');
    const openedTip = Array.from(tipsList).find(el => el.classList.contains('tooltip_active'));
    if(openedTip) {
        openedTip.classList.remove('tooltip_active');
        openedTip.remove();
    }

    const tip = document.createElement('div');
    tip.textContent = el.title;
    tip.classList.add('tooltip');
    tip.classList.add('tooltip_active');
    document.body.appendChild(tip);

    const rect = el.getBoundingClientRect();
    tip.style.left = `${rect.left}px`;
    tip.style.top = `${rect.bottom}px`;
    
    window.addEventListener('scroll', () => removeTip(tip), {once: true});
    
    function clickDocument(event) {
        if(!tip.contains(event.target)) {
            removeTip(tip);
            document.removeEventListener('click', clickDocument);
        }
    };
    
    document.addEventListener('click', clickDocument);
}

function removeTip(tip) {
    tip.classList.remove('tooltip_active');
    tip.remove();
};
