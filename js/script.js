const startButton = document.querySelector( '.button--start' ),
      guide = document.querySelector('.modal--guide'),
      guideButton = document.querySelector('.button--guide'),
      okButton = document.querySelector('.button--ok');

'use strict';

class Game {
  constructor ( score, lives, isRunning, isMouse ) {
    this.animals = ['🐭', '🐼', '🐻', '🦊', '🐱', '🐮', '🦁', '🐽', '🐨', '🐰', '🐯'];
    this.hearts = document.querySelectorAll('.lives__heart');
    this.isMouse = false;
    this.isRunning = false;
    this.score = 0;
    this.speed = 1500;
    this.lives = 3;   

    this.holes = document.querySelectorAll( '.field__animal' );
  }

  mouseChance() {
    for (var i = 0; i < 11; i++) {
      this.animals.push('🐭');
    }
  }

  inputScore() {
    const scoreValue = document.querySelector('.score__value');

    scoreValue.innerHTML = this.score;
  }

  fillLives() {
    this.hearts.forEach( (heart) => heart.classList.add('lives__heart--fill') );
    this.lives = this.hearts.length;
  }

  randomAnimals() {
    let indexAnimal = Math.floor (Math.random() * this.animals.length ),
        animal = this.animals[indexAnimal];

    return animal;
  }

  randomHole() {
    let indexHole = Math.floor( Math.random() * this.holes.length ),
        randomHole = this.holes[indexHole];
    
    return randomHole;
  }

  createAnimal () {
    let currentAnimal = this.randomAnimals(),        
        currentHole = this.randomHole();

    currentHole.innerHTML = currentAnimal;
    currentHole.classList.add('field__animal--create');

    setTimeout( () => {
      currentHole.classList.remove('field__animal--create');
      currentHole.innerHTML = "";
    }, this.speed);

    this.Hole = currentHole;
    this.Hole.style.background = '#111';

    currentHole.addEventListener('click', () => console.log( currentAnimal ));


    return currentHole;
  }


  startGame () {
    this.mouseChance();
    this.randomAnimals();
    this.randomHole();
    this.createAnimal();
    this.inputScore();


    setInterval( () => {
      this.createAnimal();
    }, this.speed);
  }
}

guideButton.addEventListener('click', showGuide);
okButton.addEventListener('click', closeModal);
startButton.addEventListener('click', startGame);

function startGame () {
  let game = new Game;

  game.startGame ();
  startButton.removeEventListener('click', startGame, false);
}

function showGuide () {
  guide.classList.remove('modal--invisible');
}

function closeModal () {
  guide.classList.add('modal--invisible');
}

