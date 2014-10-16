/*global Asteroids */

(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = { };
  }
  
  var Upgrade = Asteroids.Upgrade = function (pos, game) {
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: [0,0],
      color: Upgrade.COLOR,
      radius: Upgrade.RADIUS,
      game: game
    });
    
    this.isWrappable = false;
  };
  Asteroids.Util.inherits.call(Upgrade, Asteroids.MovingObject);
  
  Upgrade.COLOR = "#FF0000";
  Upgrade.RADIUS = 20;
  
  Upgrade.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship){
      otherObject.getUpgrade();
      this.game.remove(this);
    }
  };
  

})();