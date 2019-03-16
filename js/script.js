const gameTotal = document.querySelector('.modal--game-over'),
      guide = document.querySelector('.modal--guide'),
      guideButton = document.querySelector('.button--guide'),
      level = document.querySelector('.level__value'),
      okButton = document.querySelectorAll('.button--ok'),
      score = document.querySelector('.score__value'),
      startButton = document.querySelector( '.button--start' );

let heartIndex = 0;
      

'use strict'
class Game {
  constructor () {
    this.animals = [ '🐭', '🐼', '🐻', '🦊', '🐱', '🐮', '🐭', '🦁', '🐽', '🐨', '🐰', '🐯', '🐭' ];
    this.hearts = document.querySelectorAll('.lives__heart');
    this.isMouse = false;
    this.isRunning = false;
    this.levelValue = 1;
    this.lives = 3;
    this.scoreValue = 0;
    this.speed = 1500;

    this.holes = document.querySelectorAll( '.field__animal' );
    this.HOLE = undefined;
    this.ANIMAL = undefined;
  }

  levelUp() {
    this.levelValue ++;
    level.innerHTML = this.levelValue;
    console.log('level UP ' + this.levelValue);
    this.speed -= 100;
  }

  scorePrint() {
    this.scoreValue = this.scoreValue + 10 ;
    score.innerHTML = this.scoreValue;
    
    level.classList.remove('level--animation');

    if ( this.scoreValue % 50 === 0 ) {
      this.levelUp();
      
      startAnimation();
    }
  }

  deleteHeart() {
    this.lives--;
    this.hearts[heartIndex].classList.add( 'lives__heart--empty' );
    heartIndex++;  
    
    if (this.lives === 0) {
      gameOver();
    }
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
            
            this.deleteHeart();
            console.log( 'Жаба! ' + this.ANIMAL );
          } else {
            this.scorePrint();
            console.log( 'Ура! Мышь! ' + this.ANIMAL );
          }
      }

      this.HOLE.addEventListener( 'click', clickOnAnimals  );
      this.HOLE.classList.remove('field__animal--blood');

      setTimeout( () => {
        this.HOLE.removeEventListener( 'click', clickOnAnimals, false );
        currentHole.classList.remove( 'field__animal--create' );
        this.HOLE.innerHTML = '';
    }, this.speed*0.99 );    
  }

  gameInterval() {
    setInterval( () => {
      this.creatingAnimals();
    }, this.speed );    
  }

  startGame() {
    this.gameInterval();

    startAnimation();
  }
}

guideButton.addEventListener( 'click', showGuide );
okButton.forEach( (i) => i.addEventListener( 'click', closeModal )) ;
startButton.addEventListener( 'click', startGame );

function closeModal() {
  gameTotal.classList.add( 'modal--invisible' );
  guide.classList.add( 'modal--invisible' );
}

function gameOver() {
  gameTotal.classList.remove( 'modal--invisible' );
}

function showGuide() {
  guide.classList.remove( 'modal--invisible' );
}

function startGame() {
  let game = new Game;

  game.startGame();
  startButton.removeEventListener( 'click', startGame, false );
}

function startAnimation() {
  level.classList.add('level--animation');
}

