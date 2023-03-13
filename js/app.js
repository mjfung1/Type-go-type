

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
let bestLocalScore;
let randomWords;

// DOM Elements
const gameContainer = document.querySelector(".game-container");
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word p');
const scoreDisplay = document.querySelector('#score');
const bestScoreDisplay = document.querySelector('#best-score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('.seconds');
const audio = new Audio("../css/keyboard-sound.mp3");


currentWord.addEventListener("click", () => wordInput.focus());
gameContainer.addEventListener("click", () => wordInput.focus());



function typingSound() {
  audio.play();
}

// Fetching 
// const RANDOM_WORDS_API_URL = './words.json'

// QUOTE FETCHING. IMPLEMENT LATER
// const RANDOM_WORDS_API_URL = 'https://random-word-api.herokuapp.com/word';

const RANDOM_WORDS_API_URL = "https://random-word-api.herokuapp.com/all";




// Initialize Game
async function init() {
  // Set best score in locaStorage
  if (localStorage.getItem("best_score") == null) {
    localStorage.setItem("best_score", 0);
  }
  bestLocalScore = localStorage.getItem("best_score");
  bestScoreDisplay.innerHTML = bestLocalScore;

  // Load Words from api
  randomWords = await getRandomWords();
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord();
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
  wordInput.addEventListener("keypress", () => typingSound());

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
    const cheering = ["Good Job!", "Keep going!", "Amazing!", "Type Master", "So fast...", "Hackerboi", "WOW!", "Impressive", "Great", "Excellent" ];
    const cheer = cheering[Math.floor(Math.random() * cheering.length)];
    message.innerHTML = cheer;
    message.setAttribute('style', 'color: rgb(216, 186, 17); font-size: 2rem; font-weight:700');
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }

}

// ASYNC ATTEMPT OF RAMDOM WORDS
async function getRandomWords() {
  const response = await fetch(RANDOM_WORDS_API_URL)
  const data = await response.json();

  return data;
}

// Pick & show random word
async function showWord() {

  // const randomWord = await getRandomWord();
  // Generate random array index
  const randIndex = Math.floor(Math.random() * randomWords.length);
  // Output random word
  const randomWord = randomWords[randIndex];

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
 
    if (score > bestLocalScore) {
      bestScoreDisplay.innerHTML = score;
      localStorage.setItem("best_score", score);
    }

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
    message.innerHTML = '<div> <h3> - Game Over - </h3> <p>Type Correct Word To Reset </p> </div>' ;
    message.setAttribute('style', 'font-size: 2rem; font-weight: bold');
    score = -1;
  }
}





