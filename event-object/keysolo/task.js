class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    this.registerEvents();

    this.addTimer();

    this.reset();
  }

  addTimer() {
    const timerParag = document.createElement('p');
    timerParag.innerHTML = 'Осталось времени: ';

    this.countDownTime = document.createElement('span');
    this.countDownTime.className = 'status__timer'; 
    
    timerParag.append(this.countDownTime);
    this.lossElement.parentElement.insertAdjacentElement('afterend', timerParag);
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;  
  }

  registerEvents() {
    document.addEventListener('keydown', (event) => {
      const tappedKey = event.key.toLowerCase();
      const curSymLowCased = this.currentSymbol.textContent.toLowerCase();
      if(tappedKey.charCodeAt() === curSymLowCased.charCodeAt()) {
        this.success();
        this.startTimer();
      } else {
        this.fail()
        };
    });
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();
    
    this.renderWord(word);
    
    this.countDownTime.textContent = word.length;
    this.startTimer(); 
  }

  getWord() {
    const words = [
        'bob боб',
        'awesome круто',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript',
        'я люблю kitkat',
        'i love кит-кат',
        'english lesson',
        'русский язык',
        'символы кириллицы'
      ],
      index = Math.floor(Math.random() * words.length);
  
    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }

  startTimer() {
    if (this.intervalId) { 
      clearInterval(this.intervalId);
    };
    
    this.intervalId = setInterval(() => {
        let timerCount = Number(this.countDownTime.textContent);
        if(timerCount <= 0) {
          clearInterval(this.intervalId);
          alert('Вы проиграли!');
          this.reset(); 
        } else {
          this.countDownTime.textContent = --timerCount;
        } 
    }, 1000);
  }
}

new Game(document.getElementById('game'))

