const guide = document.querySelector('.modal--guide'),
      guideButton = document.querySelector('.button--guide'),
      okButton = document.querySelector('.button--ok'),
      startButton = document.querySelector( '.button--start' );

      let c;

'use strict'
class Game {
  constructor ( score, lives, isRunning, isMouse ) {
    this.animals = [ '🐭', '🐼', '🐻', '🦊', '🐱', '🐮', '🐭', '🦁', '🐽', '🐨', '🐰', '🐯', '🐭' ];
    this.hearts = document.querySelector('.lives__heart');
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

    return randomHole;
  }

  creatingAnimals() {
    let currentHole = this.randomHole(),
        clickOnAnimals = undefined;

    this.ANIMAL = this.randomAnimal();        
    currentHole.classList.add( 'field__animal--create' );
    
    currentHole.innerHTML = this.ANIMAL;  
    
    this.HOLE = currentHole;

    clickOnAnimals = () => {      
      this.HOLE.classList.add('field__animal--blood');
      
          if ( this.HOLE.innerHTML !== '🐭') {        
            console.log( 'Жаба! ' + this.ANIMAL );
          } else {        
            console.log( 'Ура! Мышь! ' + this.ANIMAL );
          }
      }

      this.HOLE.addEventListener( 'click', clickOnAnimals  );
      this.HOLE.classList.remove('field__animal--blood');

      setTimeout( () => {
        this.HOLE.removeEventListener( 'click', clickOnAnimals, false );
      currentHole.classList.remove( 'field__animal--create' );
      currentHole.innerHTML = '';
    }, this.speed*0.9 );    
  }

  gameInterval() {
    setInterval( () => {
      this.creatingAnimals();
    }, this.speed );    
  }

  startGame() {
    this.gameInterval();
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