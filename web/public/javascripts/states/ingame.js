/* global window */
/* global Phaser */
/* global EventBlaster */
/* global EnemyHandler */
/* global PointsHandler */
/* global LevelHandler */
/* global PlayerHandler */

var EventBlaster = EventBlaster || {};
class InGameState {
  create() {
    this.loadLevel();
    this.loadPoints();
    this.loadEnemies();
    this.loadPlayer();
  }

  loadPoints() {
    this.pointsHandler = new PointsHandler(this);
  }

  loadLevel() {
    this.levelHandler = new LevelHandler(this);
  }

  loadEnemies() {
    this.enemyHandler = new EnemyHandler(this);
    this.enemyHandler.spawn(500, 100);
    this.enemyHandler.spawn(600, 100);
    this.enemyHandler.spawn(700, 100);
    this.enemyHandler.spawn(800, 100);
  }

  loadPlayer() {
    this.playerHandler = new PlayerHandler(this);
    this.playerHandler.spawn(700, 100);
  }

  update() {
    this.pointsHandler.update();
    this.enemyHandler.update();
    this.levelHandler.update();
    this.playerHandler.update();
  }
}


EventBlaster.ingame = new InGameState();
