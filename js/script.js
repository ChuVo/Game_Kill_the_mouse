const startButton = document.querySelector( '.button--start' ),
      guide = document.querySelector('.modal--guide'),
      guideButton = document.querySelector('.button--guide'),
      okButton = document.querySelector('.button--ok');

'use strict';

class Game {
  constructor ( score, lives, isRunning, isMouse ) {
    this.animals = ['🐭', '🐼', '🐻', '🦊', '🐱', '🐮', '🦁', '🐽', '🐨', '🐰', '🐯'];
    this.hearts = document.querySelectorAll( '.lives__heart' );
    this.isMouse = false;
    this.isRunning = false;
    this.score = 0;
    this.lives = 3;
    this.speed = 1500;
       

    this.holes = document.querySelectorAll( '.field__animal' );
    this.HOLE = undefined;
    this.ANIMAL = undefined;

  }

  

  randomAnimal() {
    let indexAnimal = Math.floor( Math.random() * this.animals.length ),
        randomAnimal = this.animals[indexAnimal];
    
    return randomAnimal;
  }

  randomHole() {
    let indexHole = Math.floor( Math.random() * this.holes.length ),
        randomHole = this.holes[indexHole];

        this.HOLE = randomHole;

    return randomHole;
  }

  creatingAnimals() {
    let currentHole = this.randomHole();
        this.ANIMAL = this.randomAnimal();
        
    currentHole.classList.add( 'field__animal--create' );
    currentHole.innerHTML = this.ANIMAL;    
    
    setTimeout( () => {
      currentHole.classList.remove( 'field__animal--create' );
      currentHole.innerHTML = '';
    }, this.speed*0.9 );

  this.clickOnAnimals();
    
  }

  clickOnAnimals() {
    this.HOLE.addEventListener( 'click', () => {

      if ( this.HOLE.innerHTML === '🐭') {
        console.log( 'Ура! Мышь! ' + this.ANIMAL );
      } else {
        console.log( 'Жаба! ' + this.ANIMAL );
      }
    })
  }

  gameInterval() {
    setInterval( () => {
      this.creatingAnimals();
    }, this.speed );
  }

  chanceMouse() {
    this.animals.push = ('🐭');
  }

  startGame() {
    this.gameInterval();
    this.chanceMouse();
  }
}

guideButton.addEventListener( 'click', showGuide );
okButton.addEventListener( 'click', closeModal );
startButton.addEventListener( 'click', startGame );

function startGame() {
  let game = new Game;

  game.startGame();
  startButton.removeEventListener( 'click', startGame, false );
}

function showGuide() {
  guide.classList.remove( 'modal--invisible' );
}

function closeModal() {
  guide.classList.add( 'modal--invisible' );
}

