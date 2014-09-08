/*global Asteroids */
/*global key */

(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = { };
  }
  
  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };
  
  GameView.prototype.start = function() {
    this.bindKeyHandlers();
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20);
  };
  
  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('up', function() {
      ship.power([0, -1]);
    });
    key('left', function() {
      ship.power([-1, 0]);
    });
    key('right', function() {
      ship.power([1, 0]);
    });
    key('down', function() {
      ship.power([0, 1]);
    });
    key('space', function() {
      ship.fireBullet();
    });
  };
})();