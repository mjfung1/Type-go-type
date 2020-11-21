window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
  hard: 3,
  easy: 6
};

// To change level
let currentLevel = levels.hard;

// Current Biker Position
// let currentPosition = 50;

  
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
// const biker = document.querySelector('#bike');





// Fetching 
const RANDOM_WORDS_API_URL = './words.json'

// QUOTE FETCHING. IMPLEMENT LATER
// const RANDOM_QUOTES_API_URL = 'https://api.quotable.io/random'

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord();
  // Set Biker's initial position
  // biker.setAttribute('style', `right: ${currentPosition}px;`);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000)
  // Check game status
  setInterval(checkStatus, 50);
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
    message.setAttribute('style', 'color: white; font-size: 30px;');
    return true;
  } else {
    message.innerHTML = 'Good Job!'
    message.setAttribute('style', 'color: blue; font-size: 30px;');
    return false;
  }
}

// ASYNC ATTEMPT OF RAMDOM WORDS
function getRandomWord() {
  return fetch(RANDOM_WORDS_API_URL)
    .then(response => response.json())
    .then(data => data.data)
}

// Pick & show random word
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
    // message.setAttribute('style', 'color: red;')
    message.innerHTML = 'Game Over!!!';
    message.setAttribute('style', 'color: red; font-size: 30px;');
    score = -1;
  }
}