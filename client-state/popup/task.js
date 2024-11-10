const modalWindow = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal__close');
closeBtn.addEventListener('click', closeFunc);

function closeFunc() {
    setCookie('modalClosed', 'true');
    modalWindow.classList.remove('modal_active');
}

function setCookie(name, value, maxAge = 900) {
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Secure; SameSite=Strict`;
    console.log(`Cookie is set: ${name}=${value}`);
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for(const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if(key === name) return decodeURIComponent(value);
    }
    return null;
}

window.onload = () => {
    const isBeforeClosed = getCookie('modalClosed');
    if(!isBeforeClosed) {
        modalWindow.classList.add('modal_active');
    }
}