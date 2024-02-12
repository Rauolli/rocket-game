const app = new PIXI.Application();
const ufoList = [];
document.body.appendChild(app.view);
const rocketExplosion = PIXI.sound.Sound.from({
  url:'assets/explosion-rocket.wav',
  preload: true
});

const laserSound = PIXI.sound.Sound.from({
  url:'assets/laser-bolt.wav',
  preload: true
});

const ufoExplosion = PIXI.sound.Sound.from({  
  url:'assets/explosion-ufo.wav',
  preload: true
});


const rocket = PIXI.Sprite.from('assets/rocket1.png');
const centerX = app.screen.width / 2;
const centerY = app.screen.height / 2;
const gameOver = new PIXI.Text('Game Over', {fill: 'red', fontSize: 64});

rocket.x = centerX;
rocket.y = centerY;
rocket.scale.x= 0.06;
rocket.scale.y = 0.06;
app.stage.addChild(rocket);

gameInterval(function(){

const ufo = PIXI.Sprite.from(`assets/ufo${random(1, 2)}.png`);
ufo.x = random(0, app.screen.width);
ufo.y = -25;
ufo.scale.x= 0.05;
ufo.scale.y = 0.05;
app.stage.addChild(ufo);
ufoList.push(ufo);
flyDown(ufo, 1);

const meteor = PIXI.Sprite.from(`assets/meteor.png`);
meteor.x = random(0, app.screen.width);
meteor.y = -25;
meteor.scale.x= 0.05;
meteor.scale.y = 0.05;
app.stage.addChild(meteor);
flyDown(meteor, 0.7);


waitForCollision(ufo, rocket)
  .then(function(){
    rocketExplosion.play();
    app.stage.removeChild(rocket);
    stopGame();
    const boom = PIXI.Sprite.from('assets/boom.png');
    boom.scale.x = 0.2;
    boom.scale.y = 0.2;

    boom.y = rocket.y - 50;
    boom.x = rocket.x - 20;
    app.stage.addChild(boom);
    fadeOut(boom);
    gameOver.x = centerX - 150;
    gameOver.y = centerY - 50;
    app.stage.addChild(gameOver);
  });
    

  waitForCollision(meteor, rocket)
    .then(function(){
      rocketExplosion.play();
      app.stage.removeChild(rocket);
      stopGame();
      const boom = PIXI.Sprite.from('assets/boom.png');
      boom.scale.x = 0.2;
      boom.scale.y = 0.2;
  
      boom.y = rocket.y - 50;
      boom.x = rocket.x - 20;
      app.stage.addChild(boom);
      fadeOut(boom);
      gameOver.x = centerX - 150;
      gameOver.y = centerY - 50;
      app.stage.addChild(gameOver);
  });
      
}, 1000);

function leftKeyPressed() {
  if (rocket.x > 10)
    rocket.x -= 5;
}

function rightKeyPressed() {
  if (rocket.x < 750)
    rocket.x += 5;
}

function spaceKeyPressed() {
  const bullet = PIXI.Sprite.from('assets/bullet.png');
  bullet.x = rocket.x + (rocket.width / 2) - 3;
  bullet.y = rocket.y - 6;   
  bullet.scale.x= 0.04;
  bullet.scale.y = 0.04;
  flyUp(bullet);
  app.stage.addChild(bullet);
  laserSound.play();
  waitForCollision(bullet, ufoList).then(function([bullet, ufo]){
    app.stage.removeChild(bullet);
    app.stage.removeChild(ufo);
    const boom = PIXI.Sprite.from('assets/boom.png');
    boom.scale.x = 0.04;
    boom.scale.y = 0.04;

    boom.y = ufo.y;
    boom.x = ufo.x+13;
    app.stage.addChild(boom);
    ufoExplosion.play();
    fadeOut(boom);
   });
}  
