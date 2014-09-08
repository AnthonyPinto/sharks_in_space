/*global Asteroids */


(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = { };
  }
  
  var Ship = Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: [0,0],
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      game: game
    });
  };
  Asteroids.Util.inherits.call(Ship, Asteroids.MovingObject);
  
  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.COLOR = "#AA00FF";
  Ship.RADIUS = 20;
  Ship.MAX_VEL = 10;
  
  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    if (this.vel[0] > Ship.MAX_VEL) {
      this.vel[0] = Ship.MAX_VEL;
    }
    if (this.vel[0] < -Ship.MAX_VEL) {
      this.vel[0] = -Ship.MAX_VEL;
    }
    if (this.vel[1] > Ship.MAX_VEL) {
      this.vel[1] = Ship.MAX_VEL;
    }
    if (this.vel[1] < -Ship.MAX_VEL) {
      this.vel[1] = -Ship.MAX_VEL;
    }
    
  };
  
  Ship.prototype.fireBullet = function() {
    var bulletPos = [];
    bulletPos[0] = this.pos[0];
    bulletPos[1] = this.pos[1];
    var bullet = new Asteroids.Bullet(bulletPos, this.bulletVel(), this.game);
    this.game.add(bullet);
  };
  
  Ship.prototype.bulletVel = function() {
    var totalVel = Math.abs(this.vel[0]) + Math.abs(this.vel[1]);
    var bulletVel = [];
    bulletVel[0] = this.vel[0] / totalVel * 10;
    bulletVel[1] = this.vel[1] / totalVel * 10;
    return bulletVel;
  };

})();