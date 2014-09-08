/*global Asteroids */


(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = { };
  }
  
  var Asteroid = Asteroids.Asteroid = function(pos, game) {
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: Asteroids.Util.randomVec(10),
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      game: game
    });
  };
  Asteroids.Util.inherits.call(Asteroid, Asteroids.MovingObject);
  
  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
  
  Asteroid.COLOR = "#AAAAAA";
  Asteroid.RADIUS = 30;
  
  
})();