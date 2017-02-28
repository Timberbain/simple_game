/* global game */
/* global pointsHandler */
/* global EnemyHandler:true */
/* global player:true */
/* global obstacles */
/* global Phaser */

function range(from, to) {
  return [...Array((to + 1) - from).keys()].map(e => e + from);
}


let enemies;
class EnemyHandler {
  constructor() {
    game.load.audio('explosion', 'assets/soundeffects/explosion.wav');
    game.load.audio('hit1', 'assets/soundeffects/hit_1.wav');
    game.load.audio('hit2', 'assets/soundeffects/hit_2.wav');
    game.load.audio('hit3', 'assets/soundeffects/hit_3.wav');
    game.load.spritesheet('explosion', 'assets/explosions.png', 64, 64);
    game.load.atlas('enemy',
      'assets/enemy_atlas.png',
      'assets/enemy_atlas.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  }

  create() {
    enemies = game.add.group();
    enemies.sound = {
      explosion: game.add.audio('explosion'),
    };
  }

  spawn(x, y) {
    const enemy = game.add.sprite(x, y, 'enemy');
    game.physics.arcade.enable(enemy);
    enemy.width = 64;
    enemy.height = 64;
    enemy.body.bounce.y = 0;
    enemy.body.gravity.y = 600;
    enemy.body.collideWorldBounds = true;
    enemy.setHealth(30);
    enemy.events.onKilled.add(this.killEnemy, this);

    enemy.animations.add('walk', Phaser.Animation.generateFrameNames('enemy', 49, 56, '', 0), 1);
    enemy.animations.play('walk', 5, true);
    enemies.add(enemy);
  }

  update() {
    enemies.forEachAlive((enemy) => {
      const hitPlatform = game.physics.arcade.collide(enemy, obstacles);
      enemy.body.velocity.x = 0;
      if (enemy.body.touching.down && hitPlatform) {
        enemy.body.velocity.x -= 75;
      }
    });
  }

  killEnemy(enemy) {
    const content = 'Hej jag heter Jonas och är väldigt glad i dig';

    pointsHandler.spawn(enemy.x + 32, enemy.y + 32, content);
    const explosion = game.add.sprite(enemy.x - 96, enemy.y - 96, 'explosion');
    game.add.tween(explosion)
      .to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    game.physics.arcade.enable(explosion);
    explosion.body.velocity.x = enemy.body.velocity.x / 2;
    explosion.scale.setTo(4, 4);
    // explosion.animations.add('explode', range(36, 70), 25);
    explosion.animations.add('explode', range(101, 140), 70);
    // explosion.animations.add('explode', range(141, 166), 25);
    enemies.sound.explosion.play();
    explosion.animations.play('explode').onComplete.add(() => {
      explosion.kill();
    }, this);
  }
}
