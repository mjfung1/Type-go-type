window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
  quotes: 14,
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

// replaceeeeeeeeeeeeeeee url api
const RANDOM_WORDS_API_URL = 'https://api.quotable.io/random'

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
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
    .then(data => data.content)

}

// Pick & show random word
async function showWord(words) {
  // Generate random array index
  // const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  // const randomWord = words[randIndex];
  const randomWord = await getRandomWord();

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



// window.addEventListener("load", init);


// const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
// const quoteDisplayElement = document.getElementById('quoteDisplay')
// const quoteInputElement = document.getElementById('quoteInput')
// const timerElement = document.getElementById('timer')
// const score = document.querySelector('.score')

// quoteInputElement.addEventListener('input', () => {
//     const arrayQuote = quoteDisplayElement.querySelectorAll('span')
//     const arrayValue = quoteInputElement.value.split('')



//     let correct = true
//     arrayQuote.forEach((characterSpan, index) => {
//         const character = arrayValue[index]
//         if (character == null) {
//             characterSpan.classList.remove('correct')
//             characterSpan.classList.remove('incorrect')
//             correct = false
//         } else if (character === characterSpan.innerText) {
//             characterSpan.classList.add('correct')
//             characterSpan.classList.remove('incorrect')
//         } else {
//             characterSpan.classList.remove('correct')
//             characterSpan.classList.add('incorrect')
//             correct = false
//         }
//     })

//     let count = 0;
//     if (correct) {
//         // count = 0;   
//         count++;
//         renderNewQuote();
//         score.innerText = count;
//         // return count;
//     }
//     // return count;
// })

// function getRandomQuote() {
//     return fetch(RANDOM_QUOTE_API_URL)
//         .then(response => response.json())
//         .then(data => data.content)
// }

// async function renderNewQuote() {
//     const quote = await getRandomQuote()
//     quoteDisplayElement.innerHTML = ''
//     quote.split('').forEach(character => {
//         const characterSpan = document.createElement('span')
//         characterSpan.innerText = character
//         quoteDisplayElement.appendChild(characterSpan)
//     })
//     quoteInputElement.value = null
//     startTimer()
// }

// let startTime = 0
// function startTimer() {
//     let timer = setTimeout(() =>  getTimerTime() , 1000)
//     startTime = 30

//     function getTimerTime() {
        
//         if (startTime > 0) {
//             startTime--
//             timerElement.innerText = startTime;
//             if (startTime === 0) {
//                 timerElement.innerText = 'Game Over';
//                 clearInterval(timer);
//                 // setTimeout(() => {
//                 //         clearInterval(timer)
//                 //     }, 1000);
//                 }
//             }      
//             // clearInterval(timer);
//         }
//             // if (timer === undefined) {
//             //   clearInterval(timer);
//             // }

// }




// // Initialize Game
// function init() {
//   // Show number of seconds in UI

//   // Load word from array
//   renderNewQuote();
  
//   // Start matching on word input
// //   wordInput.addEventListener('input', startMatch);
//   // Call countdown every second
//   setInterval(countdown, 1000);
//   // Check game status
// //   setInterval(checkStatus, 50);
// }