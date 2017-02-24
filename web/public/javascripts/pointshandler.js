/* global game */
/* global playerHandler:true */
/* global player:true */
/* global obstacles */

// class PointCluster {
//   constructor(id) {
//     this.id = id;
//     this.pullTowardsHero = false;
//     this.points = game.add.group();
//   }
// }

let points;
let collectedPoints = 0;
let score;

class PointsHandler {
  create() {
    score = game.add.text(10, 10, collectedPoints, {
      font: '20px Courier New',
      fill: '#ffffff',
    });
    score.fixedToCamera = true;

    points = game.add.group();
  }

  update() {
    points.forEachAlive((cluster) => {
      if (cluster.pullTowardsHero) {
        cluster.forEachAlive((point) => {
          game.physics.arcade.accelerateToObject(point, player, 10000, 700, 700);
        });
      }

      game.physics.arcade.overlap(player, cluster, (innerHero, letter) => {
        letter.kill();
        collectedPoints += 1;
        score.text = collectedPoints;
        if (score.fontSize < 50) {
          score.fontSize += 1;
          setTimeout(() => { score.fontSize -= 1; }, 5);
        }
      }, null, this);
    });

    // }

    // for (const e of emptyGroups) {
    //   for (const i in this.pointClusters) {
    //     removeByAttr(this.pointClusters, e, 'id');
    //   }
    // }
    // console.log(this.pointClusters.length);
  }

  spawn(x, y, content) {
    const cluster = game.add.group();
    for (let i = 0; i < content.length; i += 1) {
      if (content[i] !== ' ') {
        // const red = (game.rnd.integerInRange(0, 255)).toString(16);
        // const green = (game.rnd.integerInRange(0, 255)).toString(16);
        // const blue = (game.rnd.integerInRange(0, 255)).toString(16);
        // const color = `#${red}${green}${blue}`;
        // const color = `#${red}${green}${blue}`;
        const color = '#FFF';

        const size = game.rnd.integerInRange(13, 18);
        const letter = game.add.text(x, y, content[i], {
          font: `${size}px Courier New`,
          fill: color,
        });
        game.physics.arcade.enable(letter);

        const angle = game.rnd.angle();
        const speed = game.rnd.realInRange(100, 1300);

        letter.body.velocity.x += Math.sin(angle) * speed;
        letter.body.velocity.y += Math.cos(angle) * speed;
        cluster.add(letter);
      }

      setTimeout(() => {
        cluster.pullTowardsHero = true;
      }, 300);

      points.add(cluster);
    }
  }
}
