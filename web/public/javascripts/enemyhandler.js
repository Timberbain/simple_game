/* global game */
/* global EnemyHandler:true */
/* global player:true */
/* global obstacles */
/* global Phaser */

let enemies;
class EnemyHandler {
  constructor() {
    game.load.atlas('enemy',
      'assets/enemy_atlas.png',
      'assets/enemy_atlas.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  }

  create() {
    enemies = game.add.group();

    const enemy = game.add.sprite(800, 100, 'enemy');
    game.physics.arcade.enable(enemy);
    enemy.width = 64;
    enemy.height = 64;
    enemy.body.bounce.y = 0;
    enemy.body.gravity.y = 600;
    enemy.body.collideWorldBounds = true;

    enemy.animations.add('walk', Phaser.Animation.generateFrameNames('enemy', 49, 56, '', 0), 1);
    enemy.animations.play('walk', 5, true);
    enemies.add(enemy);
  }

  update() {
    enemies.forEachAlive((enemy) => {
      const hitPlatform = game.physics.arcade.collide(enemy, obstacles);
      enemy.body.velocity.x = 0;
      if (enemy.body.touching.down && hitPlatform) {
        enemy.body.velocity.x -= 150;
      }
    });
  }
}
