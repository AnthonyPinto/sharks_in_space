/*global Asteroids */

(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  
  var MovingObject = Asteroids.MovingObject = function(argsHash) {
    this.pos = argsHash['pos'];
    this.vel = argsHash['vel'];
    this.radius = argsHash['radius'];
    this.color = argsHash['color'];
    this.game = argsHash['game'];
    this.isWrappable = true;
  };
  
  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
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
  
  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      }
    }
  };
  
  MovingObject.prototype.collideWith = function (otherObject) {

  };
  
  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var minDistance = this.radius + otherObject.radius;
    var distX = Math.abs(this.pos[0] - otherObject.pos[0]);
    var distY = Math.abs(this.pos[1] - otherObject.pos[1]);
    if (minDistance > Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))) {
      return true;
    } else {
      return false;
    }
  };
})();