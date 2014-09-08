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
  
  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };
  
  Ship.prototype.fireBullet = function() {
    var bulletVel = [];
    bulletVel[0] = this.vel[0] * 1.2;
    bulletVel[1] = this.vel[1] * 1.2;
    var bulletPos = [];
    bulletPos[0] = this.pos[0] + bulletVel[0];
    bulletPos[1] = this.pos[1] + bulletVel[1];
    var bullet = new Asteroids.Bullet(bulletPos, bulletVel, this.game);
    this.game.add(bullet);
  };

})();