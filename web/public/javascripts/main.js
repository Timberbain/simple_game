/* global Phaser */
/* global EventBlaster */
/* global window */

var EventBlaster = EventBlaster || {};

EventBlaster.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
EventBlaster.game.state.add('boot', EventBlaster.boot);
EventBlaster.game.state.add('preload', EventBlaster.preload);
EventBlaster.game.state.add('main_menu', EventBlaster.main_menu);
EventBlaster.game.state.add('ingame', EventBlaster.ingame);

EventBlaster.game.state.start('boot');
