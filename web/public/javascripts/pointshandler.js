
class PointsHandler {
  constructor(state) {
    this.state = state;
    this.state.collectedPoints = 0;
    this.state.score = this.state.game.add.text(10, 10, 0, {
      font: '20px Courier New',
      fill: '#ffffff',
    });
    this.state.score.fixedToCamera = true;
    this.state.points = state.game.add.group();
  }

  update() {
    this.state.points.forEachAlive(cluster => this.updateCluster(cluster));
  }

  updateCluster(cluster) {
    if (cluster.pullTowardsHero) {
      cluster.forEachAlive((point) => {
        this.state.game.physics.arcade.accelerateToObject(
          point, this.state.player, 10000, 700, 700);
      });
    }

    this.state.game.physics.arcade.overlap(this.state.player, cluster, (innerHero, letter) => {
      letter.kill();
      cluster.sound.collect.play();
      this.state.collectedPoints += 1;
      this.state.score.text = this.state.collectedPoints;
      if (this.state.score.fontSize < 50) {
        this.state.score.fontSize += 1;
        setTimeout(() => { this.state.score.fontSize -= 1; }, 5);
      }
    }, null, this);
  }

  spawn(x, y, content) {
    const cluster = this.state.game.add.group();
    cluster.sound = { collect: this.state.game.add.audio('pickup_coin') };
    for (let i = 0; i < content.length; i += 1) {
      if (content[i] !== ' ') {
        const color = '#FFF';
        const size = this.state.game.rnd.integerInRange(13, 18);
        const letter = this.state.game.add.text(x, y, content[i], {
          font: `${size}px Courier New`,
          fill: color,
        });
        this.state.game.physics.arcade.enable(letter);

        const angle = this.state.game.rnd.angle();
        const speed = this.state.game.rnd.realInRange(100, 1300);

        letter.body.velocity.x += Math.sin(angle) * speed;
        letter.body.velocity.y += Math.cos(angle) * speed;
        cluster.add(letter);
      }
    }

    setTimeout(() => {
      cluster.pullTowardsHero = true;
    }, 300);

    this.state.points.add(cluster);
  }
}
