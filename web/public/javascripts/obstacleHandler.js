/* global game */
/* global playerHandler:true */
/* global obstacles:true */
/* global player */

let obstacles;
class ObstacleHandler {
  create() {
    obstacles = game.add.group();
    obstacles.enableBody = true;

    const size = 32;

    let ledge = obstacles.create(size * 10, size * 14, 'ground');
    ledge.scale.setTo(5, 1);
    ledge.body.immovable = true;

    ledge = obstacles.create(size * 6, size * 13, 'ground');
    ledge.scale.setTo(3, 1);
    ledge.body.immovable = true;

    for (let i = 0; i < 1000; i += 1) {
      const ground = obstacles.create(32 * i, game.world.height - 32, 'ground');
      ground.body.immovable = true;
    }
  }

  update() {}
}
