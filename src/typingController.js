import TypingGame from './typingService.js';

let timer = undefined;
let timerCounter = 60;

let typingGame = new TypingGame();

let currentOffset = undefined;
let counter = 0;

const timerContainer = document.querySelector("#timer-span");
timerContainer.textContent = '' + timerCounter;

document.querySelector("#user-input-text").addEventListener('input', function(e) {
  const word = document.querySelector(`#row > span:nth-child(${typingGame.currentIndex + 1})`);
  if (!currentOffset) {
    currentOffset = word.offsetTop;
  }

  if (!timer) {
    timer = setInterval(function() {
      timerCounter--;
      timerContainer.innerHTML = '';
      timerContainer.textContent = '' + timerCounter;

      if (timerCounter === 0) {
        document.querySelector("#user-input-text").disabled = true;
        clearInterval(timer);

        let correctPokemonNameCount = 0;
        for (let i = 0; i < typingGame.inputs.length - 1; i++) {
          if (typingGame.inputs[i] === typingGame.target[i].name) {
            correctPokemonNameCount++;
          }
        }

        document.querySelector("#results-span").textContent
            = `${(typingGame.inputs.length - 1)} pokemon names per minute - ${(correctPokemonNameCount / (typingGame.inputs.length - 1)).toPrecision(2) * 100}% accuracy.`
      }

    }, 1000);
  }

  if (word.offsetTop !== currentOffset) {
    counter++;
    const row = document.querySelector('#row');
    row.style.marginTop = `${-41 * counter}px`;
  }

  if (e.data === ' ') {
    e.target.value = '';
    typingGame.incrementCurrentIndex();
    drawImage(typingGame.target[typingGame.currentIndex].id);
  }
  else {
    typingGame.addUserInput(e.target.value);
  }
  redraw();
});

function redraw() {
  const row = document.querySelector("#row");
  row.innerHTML = '';
  for (let i = 0; i < typingGame.target.length; i++) {
    let wordSpan = document.createElement('span');
    wordSpan.innerText = typingGame.target[i].name;

    if (i === typingGame.currentIndex) {
      wordSpan.classList.add('current-word');
    }

    if (typingGame.isInputProvidedForIndex(i)) {
      if (i === typingGame.currentIndex) {
        if (typingGame.isInputInIndexRed(i)) {
          wordSpan.classList.add('wrong');
        }
      }
      else {
        if (typingGame.isCompletedIndexRed(i)) {
          wordSpan.classList.add('wrong');
        }
        if (typingGame.isInputInIndexGreen(i)) {
          wordSpan.classList.add('correct');
        }
      }
    }
    row.appendChild(wordSpan);
  }
}

function drawImage(id) {
  let pokemonImageContainer = document.querySelector("#pokemon-image");
  pokemonImageContainer.innerHTML = '';
  let pokemonImg = document.createElement("img");
  pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  pokemonImageContainer.appendChild(pokemonImg);
}

redraw();
drawImage(typingGame.target[typingGame.currentIndex].id);

document.querySelector("#user-input-text").focus();
