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
//    this.bindKeyHandlers();
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20);
  };
  
  // GameView.prototype.bindKeyHandlers = function () {
  //   var ship = this.game.ship;
  //   key('up, left, right, down, space', function() {
  //     if (key.isPressed('up')) {
  //       ship.power(1);
  //     }
  //     if (key.isPressed('left')) {
  //       ship.rotate(-0.2);
  //     }
  //     if (key.isPressed('right')) {
  //       ship.rotate(0.2);
  //     }
  //     if (key.isPressed('down')) {
  //       ship.power(-1);
  //     }
  //     if (key.isPressed('space')) {
  //       ship.fireBullet();
  //     }
  //   });
  // };
})();