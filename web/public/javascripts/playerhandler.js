/* global game */
/* global playerHandler:true */
/* global player:true */
/* global obstacles */

let player;
class PlayerHandler {
  constructor() {
    game.load.spritesheet('megaman', 'assets/spritesheetmegaman1.png', 64, 64, -1);
  }

  create() {
    player = game.add.sprite(500, 100, 'megaman');
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    player.animations.add('idle', [0, 0, 0, 0, 0, 0, 0, 1], 1);
    player.animations.add('shoot', [8], 1);
    player.animations.add('walk', [3, 4, 5, 4], 5);
    player.animations.add('walk_shoot', [9, 10, 11, 10], 5);
    player.animations.add('jump', [12], 1);
    player.animations.add('jump_shoot', [13], 5);
    player.animations.play('idle', 5, true);

    game.camera.follow(player);
  }

  update() {
    const hitPlatform = game.physics.arcade.collide(player, obstacles);
    const cursor = game.input.keyboard.createCursorKeys();

    player.body.velocity.x = 0;
    if (cursor.left.isDown) {
      player.body.velocity.x -= 150;
      if (player.body.touching.down) {
        player.animations.play('walk');
      }
    } else if (cursor.right.isDown) {
      player.body.velocity.x += 150;
      if (player.body.touching.down) {
        player.animations.play('walk');
      }
    } else if (player.body.touching.down) {
      player.animations.play('idle');
    }

    if (cursor.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y -= 350;
      player.animations.play('jump', true);
    }
  }
}
