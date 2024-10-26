const ads = document.querySelectorAll('.rotator__case');
let currentIndex = 0;

function changeAds(arr) {
    const currentAd = arr[currentIndex];

    const color = currentAd.getAttribute('data-color');
    currentAd.style.color = color;
    currentAd.classList.remove('rotator__case_active');
    
    currentIndex = (currentIndex + 1) % arr.length;
    
    const nextAd = arr[currentIndex];
    const nextColor = nextAd.getAttribute('data-color');
    nextAd.style.color = nextColor;
    nextAd.classList.add('rotator__case_active');

    const speed = nextAd.getAttribute('data-speed');

    setTimeout(() => changeAds(arr), parseInt(speed));
}

changeAds(ads);