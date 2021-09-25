import pokemons from './pokemons.js';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const target = shuffleArray(pokemons);

export default function() {
  this.target = target;
  this.currentIndex = 0;
  this.inputs = [];
  this.addUserInput = function(input) {
    this.inputs[this.currentIndex] = input;
  };
  this.incrementCurrentIndex = function() {
    this.currentIndex++;
  }
  this.isInputProvidedForIndex = function(ix) {
    return !!this.inputs[ix];
  }
  this.isInputInIndexGreen = function(ix) {
    if (this.inputs[ix].length !== this.target[ix].name.length) {
      return false;
    }

    let isGreen = true;

    for (let i = 0; i < this.inputs[ix].length; i++) {
      if (this.inputs[ix][i] !== this.target[ix].name[i]) {
        isGreen = false;
      }
    }

    return isGreen;
  }
  this.isCompletedIndexRed = function(ix) {
    return this.target[ix].name !== this.inputs[ix];
  }
  this.isInputInIndexRed = function(ix) {
    let isRed = false;

    for (let i = 0; i < this.inputs[ix].length; i++) {
      if (this.inputs[ix][i] !== this.target[ix].name[i]) {
        isRed = true;
      }
    }
    return isRed;
  }
}
