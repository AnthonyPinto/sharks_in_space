/*global Asteroids */


(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = { };
  }
  
  var Ship = Asteroids.Ship = function (pos, game) {
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: [0,0],
      radius: Ship.RADIUS,
      game: game,
      spray: false
    });
    this.facing = 0;
    this.cooldown = 0;
    this.maxCooldown = 40;
  };
  Asteroids.Util.inherits.call(Ship, Asteroids.MovingObject);
  
  Ship.prototype.relocate = function() {
    this.game.lives -= 1;
    if (this.game.lives === 0) {
      this.game.remove(this);
    }
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.RADIUS = 20;
  Ship.MAX_VEL = 6;
  
  Ship.prototype.currentColor = function(){
    return "#" + 
      (255 - this.maxCooldown * 2).toString(16) +
      "00" +
      (175 + this.maxCooldown * 2).toString(16)
  }
  
  Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = this.currentColor();
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
    
    var velocity = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    
    if (velocity > Ship.MAX_VEL) {
      var dir = [];
      dir[0] = this.vel[0] / velocity;
      dir[1] = this.vel[1] / velocity;
      this.vel[0] = dir[0] * Ship.MAX_VEL;
      this.vel[1] = dir[1] * Ship.MAX_VEL;
    }
  };

  Ship.prototype.getUpgrade = function() {
    if (this.spray) {
     if (this.maxCooldown > 0){
       this.maxCooldown -= 5
     }
    }
    this.spray = true
  };
  
  Ship.prototype.recharge = function() {
    if (this.cooldown > 0) {
      this.cooldown -= 1;
    }
  };
  
  Ship.prototype.fireBullet = function() {
    if (this.cooldown <= 0) {
      if (this.spray) {
        this.sprayBullet()
      } else {
        this.standardBullet()
      }
      this.cooldown = this.maxCooldown;
    }
  };
  
  Ship.prototype.standardBullet = function() {
    var bulletPos = [this.pos[0] + (this.radius * Math.cos(this.facing)),
   this.pos[1] + (this.radius * Math.sin(this.facing))]
    var bullet = new Asteroids.Bullet(bulletPos, this.bulletVel(), this.game);
    this.game.add(bullet);
  };
  
  //spray
  Ship.prototype.sprayBullet = function() {
    var bulletPos1 = [this.pos[0] + (this.radius * Math.cos(this.facing - 0.25)),
    this.pos[1] + (this.radius * Math.sin(this.facing - 0.25 ))]
    var bulletPos2 = [this.pos[0] + (this.radius * Math.cos(this.facing)),
    this.pos[1] + (this.radius * Math.sin(this.facing))]
    var bulletPos3 = [this.pos[0] + (this.radius * Math.cos(this.facing + 0.25)),
    this.pos[1] + (this.radius * Math.sin(this.facing + 0.25))]
    var vels = this.sprayVels();
    var bullet1 = new Asteroids.Bullet(bulletPos1, vels[0], this.game);
    var bullet2 = new Asteroids.Bullet(bulletPos2, vels[1], this.game);
    var bullet3 = new Asteroids.Bullet(bulletPos3, vels[2], this.game);
    this.game.add(bullet1);
    this.game.add(bullet2);
    this.game.add(bullet3);
  };
  
  Ship.prototype.bulletVel = function() {
    var bulletVel = [];
    bulletVel[0] = Math.cos(this.facing) * 10;
    bulletVel[1] = Math.sin(this.facing) * 10;
    return bulletVel;
  };
  
  Ship.prototype.sprayVels = function() {
    var bulletVels = [[],[],[]];
    bulletVels[0][0] = Math.cos(this.facing - 0.25) * 10;
    bulletVels[0][1] = Math.sin(this.facing - 0.25) * 10;
    bulletVels[1][0] = Math.cos(this.facing) * 10;
    bulletVels[1][1] = Math.sin(this.facing) * 10;
    bulletVels[2][0] = Math.cos(this.facing + 0.25) * 10;
    bulletVels[2][1] = Math.sin(this.facing + 0.25) * 10;
    return bulletVels;
  };

})();