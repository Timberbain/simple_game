/* global Phaser */

function range(from, to) {
  return [...Array((to + 1) - from).keys()].map(e => e + from);
}

class EnemyHandler {
  constructor(state) {
    this.state = state;
    this.state.enemies = this.state.game.add.group();
  }

  update() {
    this.state.enemies.forEachAlive(this.updateEnemy, this);
  }

  updateEnemy(enemy) {
    const hitPlatform = this.state.game.physics.arcade.collide(enemy, this.state.tiles);
    enemy.body.velocity.x = 0;
    if (enemy.body.touching.down && hitPlatform) {
      enemy.body.velocity.x -= 75;
    }
  }

  spawn(x, y) {
    const enemy = this.state.game.add.sprite(x, y, 'enemy');
    this.state.game.physics.arcade.enable(enemy);
    enemy.width = 64;
    enemy.height = 64;
    enemy.body.bounce.y = 0;
    enemy.body.gravity.y = 600;
    enemy.body.collideWorldBounds = true;
    enemy.setHealth(30);
    enemy.events.onKilled.add(this.killEnemy, this);

    enemy.sound = {
      explosion: this.state.game.add.audio('explosion'),
    };

    enemy.animations.add('walk', Phaser.Animation.generateFrameNames('enemy', 49, 56, '', 0), 1);
    enemy.animations.play('walk', 5, true);
    this.state.enemies.add(enemy);
  }

  killEnemy(enemy) {
    const content = `Hej jag heter Jonas och är väldigt glad i digadf afd sd af s
    sdfsdgsg sdg sdg sg sg s g
    asf ag rs rt ejaej etj a  EH ZDF GAW4 RGSZXV WART S`;
    this.state.pointsHandler.spawn(enemy.x + 32, enemy.y + 32, content);

    const explosion = this.state.game.add.sprite(enemy.x - 96, enemy.y - 96, 'explosion');
    this.state.game.add.tween(explosion)
      .to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    this.state.game.physics.arcade.enable(explosion);
    explosion.body.velocity.x = enemy.body.velocity.x / 2;
    explosion.scale.setTo(4, 4);
    explosion.animations.add('explode', range(101, 140), 70);
    enemy.sound.explosion.play();
    explosion.animations.play('explode').onComplete.add(() => {
      explosion.kill();
    }, this);
  }
}
