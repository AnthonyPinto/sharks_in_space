/*global Asteroids */

(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = { };
  }
  
  var Util = Asteroids.Util = function() {};
  
  Util.inherits = function(baseClass) {
    var Surrogate = function() {};
    Surrogate.prototype = baseClass.prototype;
    this.prototype = new Surrogate();
  };
  
  Util.randomVec = function(speed) {
    var xVec = Math.random();
    var yVec = 1 - xVec;
    if (Math.random() > 0.5) {
      xVec *= -1;
    }
    if (Math.random() > 0.5) {
      yVec *= -1;
    }
    return [xVec*speed, yVec*speed];
  };
})();