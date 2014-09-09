/*global Asteroids */


(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = { };
  }
  
  var Asteroid = Asteroids.Asteroid = function(pos, size, game) {
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: Asteroids.Util.randomVec(3),
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
    if (otherObject instanceof Asteroids.Asteroid) {
      this.bounceAway(otherObject);
    }
  };
  
  Asteroid.prototype.bounceAway = function(otherAsteroid) {
    var speed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    var newDir = [this.pos[0] - otherAsteroid.pos[0],
      this.pos[1] - otherAsteroid.pos[1]];
    var multFactor = speed / (Math.sqrt(Math.pow(newDir[0], 2) + Math.pow(newDir[1], 2)));
    var newVel = [newDir[0] * multFactor, newDir[1] * multFactor];
    this.vel = newVel;
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