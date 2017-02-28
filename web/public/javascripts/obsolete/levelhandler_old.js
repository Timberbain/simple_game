/* global game */
/* global playerHandler:true */
/* global player:true */
/* global obstacles */

const background = {};
class LevelHandler {
  constructor() {
    game.load.image('mountains-back', 'assets/mountains-back.png');
    game.load.image('mountains-mid', 'assets/mountains-mid.png');
    game.load.image('mountains-front', 'assets/mountains-front.png');
  }
  create() {
    // const sky = game.add.sprite(game.world.centerX, game.world.centerY, 'sky');

    // sky.anchor.setTo(0.5, 0.5);
    //
    game.world.setBounds(0, 0, 2 * 1920, 1000);
    // const sky = game.add.sprite(game.world.centerX, game.world.centerY, 'sky');
    game.stage.backgroundColor = '#697e96';

    background.back = game.add.tileSprite(0,
        game.world.height - game.cache.getImage('mountains-back').height,
        game.world.width,
        game.cache.getImage('mountains-back').height / 2,
        'mountains-back');

    background.mid = game.add.tileSprite(0,
        game.world.height - game.cache.getImage('mountains-mid').height,
        game.world.width,
        game.cache.getImage('mountains-mid').height / 2,
        'mountains-mid');

    background.front = game.add.tileSprite(0,
        game.world.height - game.cache.getImage('mountains-front').height,
        game.world.width,
        game.cache.getImage('mountains-front').height,
        'mountains-front');
  }

  update() {
    if (game.camera.x > 0 && game.camera.x + game.camera.width < game.world.width) {
      background.back.tilePosition.x = player.x / 1.2;
      background.mid.tilePosition.x = player.x / 1.4;
      background.front.tilePosition.x = player.x / 1.9;
    }

    // background.back.tilePosition.x -= 0.05;
    // background.mid.tilePosition.x -= 0.3;
    // background.front.tilePosition.x -= 0.75;
  }
}
