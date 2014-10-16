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
    if (otherObject instanceof Asteroids.Asteroid) {
      this.bounceAway(otherObject);
    }
  };
  
  Asteroid.prototype.draw = function(ctx) {
    var grad = ctx.createLinearGradient(0, 0, this.game.DIM_X, this.game.DIM_Y);
    grad.addColorStop(0, "black");
    grad.addColorStop(0.5, this.color);
    grad.addColorStop(1, "black");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    
    ctx.fill();
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
      var numPieces = Math.floor(Math.random() * 4 + 2);
      for (var i = 0; i < numPieces; ++i) {
        this.game.add(new Asteroid([this.pos[0], this.pos[1]], 
          (this.radius / 4 * Math.random() + this.radius / 2), this.game));
      }
    }
    if (Math.random() < 0.3 && this.game.upgrades.length === 0) {
      this.game.add(new Asteroids.Upgrade([this.pos[0], this.pos[1]], this.game))
    }
    this.game.remove(this);
  };
  
  Asteroid.COLOR = "#AAAAAA";
  Asteroid.RADIUS = 30;
})();