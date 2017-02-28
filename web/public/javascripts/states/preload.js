/* global Phaser */
/* global EventBlaster */
/* global window */

var EventBlaster = EventBlaster || {};

class PreloadState {
  preload() {
    this.splash = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.game.load.setPreloadSprite(this.preloadBar);

    /* Load Player assets */
    this.game.load.audio('blaster', 'assets/soundeffects/laser_shoot.wav');
    this.game.load.spritesheet('megaman', 'assets/spritesheetmegaman1.png', 64, 64, -1, 1);
    this.game.load.atlas('bullet', 'assets/bullet_atlas.png', 'assets/bullet_atlas.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    /* Load Enemy assets */
    this.game.load.audio('explosion', 'assets/soundeffects/explosion.wav');
    this.game.load.audio('hit1', 'assets/soundeffects/hit_1.wav');
    this.game.load.audio('hit2', 'assets/soundeffects/hit_2.wav');
    this.game.load.audio('hit3', 'assets/soundeffects/hit_3.wav');
    this.game.load.spritesheet('explosion', 'assets/explosions.png', 64, 64);
    this.game.load.atlas('enemy', 'assets/enemy_atlas.png', 'assets/enemy_atlas.json',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    /* Load Points assets */
    this.game.load.audio('pickup_coin', 'assets/soundeffects/pickup_coin3.wav');

    /* Load Level assets */
    this.game.load.image('mountains-back', 'assets/mountains-back.png');
    this.game.load.image('mountains-mid', 'assets/mountains-mid.png');
    this.game.load.image('mountains-front', 'assets/mountains-front.png');
  }

  create() {
    this.state.start('main_menu');
  }
}


EventBlaster.preload = new PreloadState();
