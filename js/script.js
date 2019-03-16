const audio=document.querySelector("audio"),
      gameTotal = document.querySelector( '.modal--total' ),
      guide = document.querySelector( '.modal--guide' ),
      guideButton = document.querySelector( '.button--guide' ),
      level = document.querySelector( '.level__value' ),
      okButton = document.querySelectorAll( '.button--ok' ),
      okButtonTotal = document.querySelector( '.button--ok-total' ),
      score = document.querySelector( '.score__value' ),
      startButton = document.querySelector( '.button--start' );

let heartIndex = 0;

widthScreen();
audio.volume = 0.2;//level sound
audio.classList.add('player');

'use strict'
class Game {
  constructor () {
    this.ANIMAL = undefined;
    this.animals = [ '🐭', '🐼', '🐻', '🦊', '🐱', '🐮', '🐭', '🦁', '🐽', '🐨', '🐰', '🐯', '🐭' ];
    this.cycleGame = undefined;
    this.hearts = document.querySelectorAll( '.lives__heart' );
    this.HOLE = undefined;
    this.holes = document.querySelectorAll( '.field__animal' );
    this.isMouse = false;
    this.isRunning = false;
    this.levelValue = 1;
    this.lives = 3;
    this.scoreValue = 0;
    this.speed = 1500;
  }

  levelPrint() {
    level.innerHTML = this.levelValue;
  }

  levelUp() {
    this.levelValue ++;
    this.levelPrint();
    console.log('level UP ' + this.levelValue);
    this.speed -= 200;
  }
  
  scorePrint() {
    score.innerHTML = this.scoreValue;
  }

  scoreUp() {
    this.scoreValue = this.scoreValue + 10 ;
    this.scorePrint();
    
    level.classList.remove('level--animation');

    if ( this.scoreValue % 50 === 0 ) {
      this.levelUp();
      
      levelAnimation();
    }
  }

  livesPrint() {
    this.hearts[heartIndex].classList.add( 'lives__heart--empty' );
  }  

  deleteHeart() {
    this.lives--;
    this.livesPrint();
    heartIndex++;  
    
    if (this.lives === 0) {

      this.isRunning = false;
      this.showTotal();
      this.reset();
      this.stopGame();
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
          }
          if ( this.HOLE.innerHTML === '🐱') {
            console.log('cat')
            meow();
          }
           else {
            this.scoreUp();
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
    this.cycleGame = setInterval( () => {
      this.creatingAnimals();
    }, this.speed );
  }

  startGame() {

    levelAnimation();
    this.gameInterval();
  }

  reset() {
    okButtonTotal.addEventListener('click', () => {
      
      heartIndex = 0;
      this.levelValue = 1;  this.levelPrint();
      this.lives = 3;       this.hearts.forEach( (i) => i.classList.remove( 'lives__heart--empty' ) );
      this.scoreValue = 0;  this.scorePrint();
      this.speed = 1500;
    });
  }

  stopGame() {
    if ( this.isRunning === false ) {
      clearInterval( this.cycleGame );console.log('clearInterval; Runing-' + this.isRunning );
    }
    startButton.addEventListener( 'click', startGame );
    level.classList.remove('level--animation');
  }

  printScore() {
    let scoreTotal = document.querySelector('.end-game__value');

    scoreTotal.innerHTML = this.scoreValue;
  }
  
  showTotal() {
    this.printScore();
    gameTotal.classList.remove( 'modal--invisible' );
  }
}

guideButton.addEventListener( 'click', showGuide );
okButton.forEach( (i) => i.addEventListener( 'click', closeModal )) ;
startButton.addEventListener( 'click', startGame );

function closeModal() {
  gameTotal.classList.add( 'modal--invisible' );
  guide.classList.add( 'modal--invisible' );
}

function showGuide() {
  guide.classList.remove( 'modal--invisible' );
}

function startGame() {
  let game = new Game;

  game.startGame();
  startButton.removeEventListener( 'click', startGame, false );
}

function levelAnimation() {
  level.classList.add('level--animation');
}

function widthScreen() {
  if ( document.documentElement.clientWidth <= 850 ) {
    startButton.innerHTML = '<div class="play"></div>';
  }
}

guideButton.addEventListener( 'click', play );
okButton.forEach( (i) => i.addEventListener('click', play) );
startButton.addEventListener( 'click', play );

function play() {
  document.querySelector('.sound-button').innerHTML ='<audio autoplay="autoplay" class="click-button"><source /><source src="/media/click.mp3" type="audio/mpeg"/></audio>';
}

function meow() {
  document.querySelector('.sound-button').innerHTML ='<audio autoplay="autoplay" class="click-button"><source /><source src="/media/meou.mp3" type="audio/mpeg"/></audio>';
}