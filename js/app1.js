// window.addEventListener('load', init);

// Globals
// const words = [
//   'hat',
//   'river',
//   'lucky',
//   'statue',
//   'generate',
//   'stubborn',
//   'cocktail',
//   'runaway',
//   'joke',
//   'developer',
//   'establishment',
//   'hero',
//   'javascript',
//   'nutrition',
//   'revolver',
//   'echo',
//   'siblings',
//   'investigate',
//   'horrendous',
//   'symptom',
//   'laughter',
//   'magic',
//   'master',
//   'space',
//   'definition'
// ];


// Available Levels
const levels = {
  quotes: 20,
  words: 4,
  panic: 3
};

// To change level
const currentLevel = levels.quotes;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const quoteButton = document.querySelector('.quotes')
const wordButton = document.querySelector('.words')

// replaceeeeeeeeeeeeeeee url api
const RANDOM_QUOTES_API_URL = 'https://api.quotable.io/random'
const RANDOM_WORDS_API_URL = './words.json'



// let myInterval = setInterval(countdown, 1000);

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  let myInterval = setInterval(countdown, 1000);
  showWord();
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  // setInterval(countdown, 1000);
  clearInterval(myInterval);
  myInterval
  // Check game status
  setInterval(checkStatus, 50);
  // location.reload();

}

function init2() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showQuote();
  // Start matching on word input
  wordInput.addEventListener('input', startMatch2);
  // Call countdown every second
  // setInterval(countdown, 1000);
  let myInterval = setInterval(countdown, 1000);
  myInterval
  clearInterval(myInterval);
  // Check game status
  setInterval(checkStatus, 50);
  // location.reload();

}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord();
    wordInput.value = '';
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

function startMatch2() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showQuote();
    wordInput.value = '';
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {

  const arrayCurrentWord = currentWord.querySelectorAll('span');
  const arrayWordInput = wordInput.value.split('');

  let correct = true;
  arrayCurrentWord.forEach((characterSpan, index) => {
    const character = arrayWordInput[index];

    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
  }
  });

  
  if (wordInput.value === currentWord.innerText) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}


// ASYNC ATTEMPT OF RAMDOM WORDS
function getRandomWord() {
  return fetch(RANDOM_WORDS_API_URL)
    .then(response => response.json())
    .then(data => data.data)
}

function getRandomQuote() {
  return fetch(RANDOM_QUOTES_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

// Pick & show random word
async function showQuote() {
  const randomQuote = await getRandomQuote();

  currentWord.innerHTML = '';
  randomQuote.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    currentWord.appendChild(characterSpan);
  });

}

async function showWord() {

  const words = await getRandomWord();
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  const randomWord = words[randIndex];

  currentWord.innerHTML = '';
  randomWord.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    currentWord.appendChild(characterSpan);
  });

}




// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
  }
}


quoteButton.addEventListener('click', init2);
wordButton.addEventListener('click', init);



