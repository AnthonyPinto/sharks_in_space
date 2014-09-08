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
    this.facing = 0;
  };
  Asteroids.Util.inherits.call(Ship, Asteroids.MovingObject);
  
  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.COLOR = "#AA00FF";
  Ship.RADIUS = 20;
  Ship.MAX_VEL = 8;
  
  Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.pos[0] + (this.radius * Math.cos(this.facing)),
     this.pos[1] + (this.radius * Math.sin(this.facing)));
    ctx.lineTo(this.pos[0] + (this.radius * Math.cos(this.facing + 2.5)),
     this.pos[1] + (this.radius * Math.sin(this.facing + 2.5)));
    ctx.lineTo(this.pos[0] + (this.radius * Math.cos(this.facing - 2.5)),
     this.pos[1] + (this.radius * Math.sin(this.facing - 2.5)));
    ctx.closePath();
    ctx.fill();
  };
  
  Ship.prototype.rotate = function(change) {
    this.facing += change;
    this.facing += 2 * Math.PI;
    this.facing = this.facing % (2 * Math.PI);
  };
  
  Ship.prototype.power = function(thrust) {
    this.vel[0] += thrust * Math.cos(this.facing);
    this.vel[1] += thrust * Math.sin(this.facing);
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

  
  // Ship.prototype.power = function(impulse) {
  //   this.vel[0] += impulse[0];
  //   this.vel[1] += impulse[1];
  //   if (this.vel[0] > Ship.MAX_VEL) {
  //     this.vel[0] = Ship.MAX_VEL;
  //   }
  //   if (this.vel[0] < -Ship.MAX_VEL) {
  //     this.vel[0] = -Ship.MAX_VEL;
  //   }
  //   if (this.vel[1] > Ship.MAX_VEL) {
  //     this.vel[1] = Ship.MAX_VEL;
  //   }
  //   if (this.vel[1] < -Ship.MAX_VEL) {
  //     this.vel[1] = -Ship.MAX_VEL;
  //   }
  //
  // };
  
  Ship.prototype.fireBullet = function() {
    var bulletPos = [];
    bulletPos[0] = this.pos[0];
    bulletPos[1] = this.pos[1];
    var bullet = new Asteroids.Bullet(bulletPos, this.bulletVel(), this.game);
    this.game.add(bullet);
  };
  
  Ship.prototype.bulletVel = function() {
    var bulletVel = [];
    bulletVel[0] = Math.cos(this.facing) * 10;
    bulletVel[1] = Math.sin(this.facing) * 10;
    return bulletVel;
  };

})();