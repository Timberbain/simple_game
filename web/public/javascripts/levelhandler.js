/* global game */
/* global playerHandler:true */
/* global player:true */
/* global obstacles */

class LevelHandler {
  constructor(state) {
    this.state = state;
    this.init();
  }

  init() {
    this.state.game.world.setBounds(0, 0, 2 * 700, 700);
    this.state.game.stage.backgroundColor = '#697e96';
    this.state.background = {};
    this.state.background.back = this.state.game.add.tileSprite(0,
        this.state.game.world.height - this.state.game.cache.getImage('mountains-back').height,
        this.state.game.world.width,
        this.state.game.cache.getImage('mountains-back').height / 2,
        'mountains-back');

    this.state.background.mid = this.state.game.add.tileSprite(0,
        this.state.game.world.height - this.state.game.cache.getImage('mountains-mid').height,
        this.state.game.world.width,
        this.state.game.cache.getImage('mountains-mid').height / 2,
        'mountains-mid');

    this.state.background.front = this.state.game.add.tileSprite(0,
        this.state.game.world.height - this.state.game.cache.getImage('mountains-front').height,
        this.state.game.world.width,
        this.state.game.cache.getImage('mountains-front').height,
        'mountains-front');

    this.state.tiles = this.state.game.add.group();
    this.state.tiles.enableBody = true;

    const size = 32;
    for (let i = 0; i < 1000; i += 1) {
      const ground = this.state.tiles.create(size * i, this.state.game.world.height - size, 'ground');
      ground.body.immovable = true;
    }
  }

  update() {
    if (this.state.game.camera.x > 0
      && this.state.game.camera.x + this.state.game.camera.width < this.state.game.world.width) {
      this.state.background.back.tilePosition.x = this.state.player.x / 1.2;
      this.state.background.mid.tilePosition.x = this.state.player.x / 1.4;
      this.state.background.front.tilePosition.x = this.state.player.x / 1.9;
    }
  }
}
