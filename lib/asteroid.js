/*global Asteroids */


(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = { };
  }
  
  var Asteroid = Asteroids.Asteroid = function(pos, size, game) {
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: Asteroids.Util.randomVec(10),
      color: Asteroid.COLOR,
      radius: size,
      game: game
    });
  };
  Asteroids.Util.inherits.call(Asteroid, Asteroids.MovingObject);
  
  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
  
  Asteroid.prototype.hitBullet = function () {
    if (this.radius > 30) {
      var numPieces = Math.floor(Math.random() * 4 + 1);
      for (var i = 0; i < numPieces; ++i) {
        this.game.add(new Asteroid([this.pos[0], this.pos[1]], 
          (this.radius / 2), this.game));
      }
    }
    this.game.remove(this);
  };
  
  Asteroid.COLOR = "#AAAAAA";
  Asteroid.RADIUS = 30;
  
  
})();