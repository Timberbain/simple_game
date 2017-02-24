/* global game */
/* global Phaser */
/* global playerHandler:true */
/* global player:true */
/* global obstacles */
/* global enemies */

let player;
let bullets;
let bulletTime;
class PlayerHandler {
  constructor() {
    game.load.spritesheet('megaman', 'assets/spritesheetmegaman1.png', 64, 64, -1, 1);
    bulletTime = game.time.now;
    game.load.atlas('bullet',
      'assets/bullet_atlas.png',
      'assets/bullet_atlas.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  }

  create() {
    player = game.add.sprite(500, 100, 'megaman');

    game.physics.arcade.enable(player);

    player.body.setSize(44, 64, 10, 0);
    player.scale.setTo(1, 1);

    player.body.bounce.y = 0;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    player.animations.add('idle', [0, 0, 0, 0, 0, 0, 0, 1], 1);
    player.animations.add('shoot', [7], 1);
    player.animations.add('walk', [3, 4, 5, 4], 5);
    player.animations.add('walk_shoot', [9, 10, 11, 10], 5);
    player.animations.add('jump', [11], 1);
    player.animations.add('jump_shoot', [12], 5);
    player.animations.play('idle', 5, true);

    // player.animations.add('idle', ['hero1', 'hero1', 'hero1', 'hero1', 'hero2'], 1);
    // // player.animations.add('shoot', ['hero9'], 1);
    // player.animations.add('walk', ['hero4', 'hero5', 'hero6', 'hero5'], 5);
    // // player.animations.add('walk_shoot', ['hero10', 'hero11', 'hero12', 'hero11'], 5);
    // player.animations.add('jump', ['hero13'], 1);
    // // player.animations.add('jump_shoot', ['hero14'], 5);
    // // player.animations.play('idle', 5, true);
    // // player.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 1, 10, '', 0), 5);
    // player.animations.play('walk', 5, true);

    game.camera.follow(player);

    this.cursor = game.input.keyboard.createCursorKeys();
    this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);


    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(10, 'bullet');
    bullets.forEach((thisBullet) => {
      thisBullet.animations.add('fired', Phaser.Animation.generateFrameNames('fbullet', 4, 7), 1);
      thisBullet.width = 25;
      thisBullet.height = 25;
    });
    bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', (thisBullet) => { thisBullet.kill(); }, this);
    bullets.setAll('checkWorldBounds', true);
  }

  update() {
    const hitPlatform = game.physics.arcade.collide(player, obstacles);

    player.body.velocity.x = 0;
    if (this.cursor.left.isDown) {
      player.body.velocity.x -= 150;
      if (player.body.touching.down) {
        player.animations.play('walk');
      }
    } else if (this.cursor.right.isDown) {
      player.body.velocity.x += 150;
      if (player.body.touching.down) {
        player.animations.play('walk');
      }
    } else if (player.body.touching.down) {
      player.animations.play('idle');
    }
    if (this.fireKey.isDown) {
      this.fireBullet();
      player.animations.play('shoot');
    }

    if (this.cursor.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y -= 350;
      player.animations.play('jump', true);
    }

    game.physics.arcade.overlap(bullets, enemies, (bullet, enemy) => {
      enemy.damage(10);
      game.add.tween(enemy)
        .to({ tint: 0xfefefe }, 200, Phaser.Easing.Linear.None, true);
      bullet.kill();
    });
    bullets.forEachAlive((thisBullet) => {
      if (thisBullet.body.x < game.camera.x
        || thisBullet.body.x > game.camera.x + game.camera.width) {
        thisBullet.kill();
      }
    });
  }

  fireBullet() {
    if (game.time.now > bulletTime) {
      const bullet = bullets.getFirstExists(false);
      if (bullet) {
        bullet.play('fired', 25, false);
        bullet.reset(player.x + 64, player.y + 33);
        bullet.body.velocity.x = 500;
        bulletTime = game.time.now + 250;
      }
    }
  }

}
