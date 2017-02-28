/* global game */
/* global Phaser */
/* global playerHandler:true */
/* global player:true */
/* global obstacles */
/* global enemies */

class PlayerHandler {
  constructor(state) {
    this.state = state;
    this.bulletTime = this.state.game.time.now;
  }

  spawn(x, y) {
    this.state.player = this.state.game.add.sprite(x, y, 'megaman');
    this.state.player.sound = {};
    this.state.player.sound.blaster = this.state.game.add.audio('blaster');
    this.state.player.sound.hit = [
      this.state.game.add.audio('hit1'),
      this.state.game.add.audio('hit2'),
      this.state.game.add.audio('hit3'),
    ];

    this.state.game.physics.arcade.enable(this.state.player);

    this.state.player.body.setSize(44, 64, 10, 0);
    this.state.player.scale.setTo(1, 1);

    this.state.player.body.bounce.y = 0;
    this.state.player.body.gravity.y = 600;
    this.state.player.body.collideWorldBounds = true;

    this.state.player.animations.add('idle', [0, 0, 0, 0, 0, 0, 0, 1], 1);
    this.state.player.animations.add('shoot', [7], 1);
    this.state.player.animations.add('walk', [3, 4, 5, 4], 5);
    this.state.player.animations.add('walk_shoot', [9, 10, 11, 10], 5);
    this.state.player.animations.add('jump', [11], 1);
    this.state.player.animations.add('jump_shoot', [12], 5);
    this.state.player.animations.play('idle', 5, true);

    this.state.game.camera.follow(this.state.player);

    this.cursor = this.state.game.input.keyboard.createCursorKeys();
    this.fireKey = this.state.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.state.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);


    this.state.bullets = this.state.game.add.group();
    this.state.bullets.enableBody = true;
    this.state.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.state.bullets.createMultiple(10, 'bullet');
    this.state.bullets.forEach((thisBullet) => {
      thisBullet.animations.add('fired', Phaser.Animation.generateFrameNames('fbullet', 4, 7), 1);
      thisBullet.width = 25;
      thisBullet.height = 25;
    });
    this.state.bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', (thisBullet) => { thisBullet.kill(); }, this);
    this.state.bullets.setAll('checkWorldBounds', true);
  }

  update() {
    const game = this.state.game;
    const player = this.state.player;
    const tiles = this.state.tiles;

    const hitPlatform = game.physics.arcade.collide(player, tiles);

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
    }

    if (this.cursor.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y -= 350;
      player.animations.play('jump', true);
    }

    const bullets = this.state.bullets;
    const enemies = this.state.enemies;
    game.physics.arcade.overlap(bullets, enemies, (bullet, enemy) => {
      enemy.damage(10);
      player.sound.hit[game.rnd.integerInRange(0, 2)].play();
      game.add.tween(enemy)
        .to({ tint: 0xaeaeae }, 200, Phaser.Easing.Linear.None, true)
        .onComplete.add(() => {
          enemy.tint = 0xffffff;
        }, this);
      bullet.kill();
    });

    const camera = this.state.game.camera;
    bullets.forEachAlive((thisBullet) => {
      if (thisBullet.body.x < camera.x
        || thisBullet.body.x > camera.x + camera.width) {
        thisBullet.kill();
      }
    });
  }

  fireBullet() {
    const game = this.state.game;
    const bullets = this.state.bullets;
    const player = this.state.player;
    if (game.time.now > this.bulletTime) {
      const bullet = bullets.getFirstExists(false);
      if (bullet) {
        player.animations.play('shoot');
        player.sound.blaster.play();
        bullet.play('fired', 25, false);
        bullet.reset(player.x + 64, player.y + 33);
        bullet.body.velocity.x = 500;
        this.bulletTime = game.time.now + 250;
      }
    }
  }

}
