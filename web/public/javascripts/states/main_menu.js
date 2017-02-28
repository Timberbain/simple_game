/* global Phaser */
/* global EventBlaster */
/* global window */

var EventBlaster = EventBlaster || {};

class MainMenuState {
  create() {
    this.game.stage.backgroundColor = '#697e96';
    this.background = {};
    this.background.back = this.game.add.tileSprite(0,
        this.game.world.height - this.game.cache.getImage('mountains-back').height,
        this.game.world.width,
        this.game.cache.getImage('mountains-back').height / 2,
        'mountains-back');

    this.background.mid = this.game.add.tileSprite(0,
        this.game.world.height - this.game.cache.getImage('mountains-mid').height,
        this.game.world.width,
        this.game.cache.getImage('mountains-mid').height / 2,
        'mountains-mid');

    this.background.front = this.game.add.tileSprite(0,
        this.game.world.height - this.game.cache.getImage('mountains-front').height,
        this.game.world.width,
        this.game.cache.getImage('mountains-front').height,
        'mountains-front');

    this.background.back.autoScroll(-5, 0);
    this.background.mid.autoScroll(-10, 0);
    this.background.front.autoScroll(-20, 0);

    const text = 'Tap to begin';
    const style = { font: '30px Arial', fill: '#fff', align: 'center' };

    const t = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
    t.anchor.set(0.5, 0.5);

    this.startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
  }

  update() {
    if (this.startKey.isDown) {
      this.game.state.start('ingame');
    }
  }
}


EventBlaster.main_menu = new MainMenuState();
