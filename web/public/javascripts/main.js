/* global Phaser */
/* global PlayerHandler */
/* global ObstacleHandler */
/* global PointsHandler */
/* global LevelHandler */
/* global EnemyHandler */

/* global player */
/* global obstacles */

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload, create, update });

let playerHandler;
let obstacleHandler;
let pointsHandler;
let levelHandler;
let enemyHandler;
// let coins;

function preload() {
  levelHandler = new LevelHandler();
  playerHandler = new PlayerHandler();
  enemyHandler = new EnemyHandler();
  obstacleHandler = new ObstacleHandler();
  pointsHandler = new PointsHandler();

  // game.load.spritesheet('coin', 'assets/coin.jpg', 100, 100, -1, -5, 0);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  levelHandler.create();
  playerHandler.create();
  enemyHandler.create();
  obstacleHandler.create();
  pointsHandler.create();

  enemyHandler.spawn(500, 600);
  enemyHandler.spawn(600, 600);
  enemyHandler.spawn(700, 600);
  enemyHandler.spawn(800, 600);
  // initateCoins();
  // createTexts();
}

function createTexts() {
  const content = `Hej jag heter Jonas och är väldigt
  glad jioasd asd uuarw bas ljbdf
  asdasga  af sdg af sdg  adfdfdsfs sgrwhwga fdsf gs ea gsd er a aet gsd fa
  ea aegsdg aref gs aghwr g sd
  sfh sfg hsfhfj rjy rj fdyj
  fj fj ghk fuk tyfjhrzjmtcyj ddsne5rdywry sezrsyes tdh esujmtdrerydtrd fd
  rstu zdr sr6utrt7 uezrdfxes`;

  pointsHandler.spawn(600, 100, content);
}

function update() {
  // game.physics.arcade.collide(coins, obstacles);
  // game.physics.arcade.collide(letters, obstacles);

  playerHandler.update();
  enemyHandler.update();
  pointsHandler.update();
  levelHandler.update();
}


// function initateCoins() {
//   coins = game.add.group();
//
//   for (let i = 0; i < 100; i += 1) {
//     const rx = Math.floor(Math.random() * Math.floor(game.width / 32));
//     const ry = Math.floor(Math.random() * 10);
//     const coin = coins.create(32 * rx, 32 * ry, 'coin');
//     coin.width = 32;
//     coin.height = 32;
//     game.physics.arcade.enable(coin);
//
//     coin.body.bounce.y = 0.5;
//     coin.body.gravity.y = 300;
//     coin.body.collideWorldBounds = true;
//     const animationOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//     const offset = game.rnd.realInRange(0, 9);
//     for (let j = 0; j < offset; j += 1) {
//       const first = animationOrder.shift();
//       animationOrder.push(first);
//     }
//     coin.animations.add('spin', animationOrder, 15, true);
//     coin.animations.play('spin');
//   }
// }
