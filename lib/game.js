/*global Asteroids */
/*global key */

(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = { };
  }
  
  var Game = Asteroids.Game = function (DIM_X, DIM_Y, NUM_ASTEROIDS) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.NUM_ASTEROIDS = NUM_ASTEROIDS;
    this.asteroids = [];
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
    this.addAsteroids();
    this.bullets = [];
    this.img = new Image();
    this.img.src = 'sharks-in-space.jpg';
    this.lives = 3;
  };
  
  Game.prototype.add = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };
  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };
  
  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), 160, this));
    }
  };
  
  Game.prototype.allObjects = function () {
    if (this.ship){
      return this.asteroids.concat(this.ship).concat(this.bullets);
    } else {
      return this.asteroids.concat(this.bullets);
    }
  };
  
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(this.img, 0, 0, this.DIM_X, this.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
    ctx.fillStyle = "white";
    ctx.font = "" + 20 + "pt Arial";
    ctx.fillText("Lives Left: " + this.lives, 10, 30);
    if (!this.ship) {
      ctx.fillStyle = "white";
      ctx.font = "" + 50 + "pt Arial";
      ctx.fillText("GAME OVER", this.DIM_X/2 -250, this.DIM_Y/2 + 25);
    }
    if (this.asteroids.length === 0) {
      ctx.fillStyle = "white";
      ctx.font = "" + 50 + "pt Arial";
      ctx.fillText("YOU WIN", this.DIM_X/2 -230, this.DIM_Y/2 + 25);
    }
  };
  
  Game.prototype.moveObjects = function () {
    var objArray = this.allObjects();
    objArray.forEach(function (object) {
      object.move();
    });
  };
  
  Game.prototype.wrap = function (pos) {
    var newPos = pos;
    newPos[0] += this.DIM_X;
    newPos[1] += this.DIM_Y;
    return [newPos[0] % this.DIM_X, newPos[1] % this.DIM_Y];
  };
  
  Game.prototype.isOutOfBounds = function(pos) {
    return (pos[0] > this.DIM_X || pos[0] < 0 || pos[1] > this.DIM_Y || pos[1] < 0);
  };
  
  Game.prototype.checkCollisions = function() {
    var objs = this.allObjects();
    for (var i = 0; i < objs.length; i++) {
      for (var j = i + 1; j < objs.length; j++) {
        if (objs[i].isCollidedWith(objs[j])) {
          var obj1 = objs[i];
          var obj2 = objs[j];
          obj1.collideWith(obj2);
          obj2.collideWith(obj1);
        }
      }
    }
  };
  
  Game.prototype.remove = function(obj){
    if (obj instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(obj);
      this.asteroids.splice(index, 1);
    } else if (obj instanceof Asteroids.Bullet) {
      var idx = this.bullets.indexOf(obj);
      this.bullets.splice(idx, 1);
    } else if (obj instanceof Asteroids.Ship) {
      this.ship = null;
      this.gameOver;
    }
  };
  
  
  Game.prototype.step = function() {
    if (this.ship) {
      var ship = this.ship;
      ship.recharge();
      if (key.isPressed('up')) {
        ship.power(0.3);
      }
      if (key.isPressed('left')) {
        ship.rotate(-0.1);
      }
      if (key.isPressed('right')) {
        ship.rotate(0.1);
      }
      if (key.isPressed('down')) {
        ship.power(-0.3);
      }
      if (key.isPressed('space')) {
        ship.fireBullet();
      }
    }
    this.moveObjects();
    this.checkCollisions();
  };
})();