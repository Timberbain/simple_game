/* global Phaser */
/* global EventBlaster */
/* global window */

var EventBlaster = EventBlaster || {};

class BootState {
  preload() {
    this.game.load.image('logo', 'assets/sky_background.jpg');
    // this.game.load.image('preloadbar', 'assets/logo.png');
  }
  create() {
    this.game.stage.backgrounColor = '#fff';
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.minWidth = 240;
    this.scale.minHeight = 170;
    this.scale.maxWidth = 2880;
    this.scale.maxHeight = 1920;

    this.scale.pageAlignHorizontally = true;
    // this.scale.setScreenSize(true);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('preload');
  }
}

EventBlaster.boot = new BootState();
