(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Snowfield = require('./weather');

var container = document.getElementById('canvas');

var weather = new Snowfield(container);
},{"./weather":4}],2:[function(require,module,exports){
/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
},{}],3:[function(require,module,exports){
function Snow(x, y, size, velocity) {     
    this.size = size;
    this.velocity = velocity;
    this.yPos = y; 
    this.xPos = x;   
};

module.exports = Snow;
},{}],4:[function(require,module,exports){
var debounce = require('./debounce');
var Snow = require('./snow');



// just snow to begin with //


function Snowfield(el) {
	this.element = el;
	this.canvas = null;
	this.weatherType = 'snow';
	this.maxVelocity = 275;
	this.minVelocity = 100;
	this.snowFlakes = 300;
	this.init();
}

Snowfield.prototype.init = function() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;		 
    
    var canvas = document.getElementById('canvas'); 

	this.canvas = canvas;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.start();
};

Snowfield.prototype.start = function() {
	var snowFlakes = [];
	for(var i = 0; i < this.snowFlakes; i++) {
		snowFlakes[i] = this.snowHandler(snowFlakes[i]);
	}
	this.snowFlakes = snowFlakes;

	this.interval();
};

Snowfield.prototype.snowHandler = function(currentSnowFlake,snowFlakeStatus) {
	var startPoint;
	if(snowFlakeStatus === 'died') {
		startPoint = 0;
	} else {
		startPoint = Math.floor(Math.random()*this.height);
	}	
	currentSnowFlake = new Snow(Math.random()*this.width, startPoint, Math.random()*2+1,(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	return currentSnowFlake;
}

Snowfield.prototype.draw = function() {
	var ctx = this.canvas.getContext('2d');

	var background = new Image();
	background.src = '/img/optimised/nature-images.jpg';
	background.scope = this;
	background.baseHeight = 1080;
	background.baseWidth = 1920; 
	background.width = background.baseWidth;
	background.height = background.baseHeight;
	background.onload = function() {
		ctx.drawImage(background,0,0,background.width,background.height);
		var _this = background.scope;

		ctx.fillStyle = ('#FFFFFF');
		for(var i = 0; i < _this.snowFlakes.length; i++) {
	        var snowFlake = _this.snowFlakes[i];
	        ctx.fillRect(snowFlake.xPos, snowFlake.yPos, snowFlake.size, snowFlake.size);
	    }
	};
};

Snowfield.prototype.update = function() {
	var dt = 1 / this.fps;
	for(var i = 0; i < this.snowFlakes.length; i++) {
		var snowFlake = this.snowFlakes[i];
		snowFlake.yPos += dt * snowFlake.velocity;

		if(snowFlake.yPos > this.height) {
			this.snowFlakes[i] = this.snowHandler(this.snowFlakes[i],'died');
		}
	}
};

Snowfield.prototype.interval = function() {
	this.update();
    this.draw();
	window.requestAnimationFrame(this.interval.bind(this));
}

module.exports = Snowfield;
},{"./debounce":2,"./snow":3}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9MZW8vRG9jdW1lbnRzL0RldmVsb3BtZW50L2hvbWVwYWdlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvTGVvL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ob21lcGFnZS9hcHAvanMvc3JjL2FwcC5qcyIsIi9Vc2Vycy9MZW8vRG9jdW1lbnRzL0RldmVsb3BtZW50L2hvbWVwYWdlL2FwcC9qcy9zcmMvZGVib3VuY2UuanMiLCIvVXNlcnMvTGVvL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ob21lcGFnZS9hcHAvanMvc3JjL3Nub3cuanMiLCIvVXNlcnMvTGVvL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ob21lcGFnZS9hcHAvanMvc3JjL3dlYXRoZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBTbm93ZmllbGQgPSByZXF1aXJlKCcuL3dlYXRoZXInKTtcblxudmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcblxudmFyIHdlYXRoZXIgPSBuZXcgU25vd2ZpZWxkKGNvbnRhaW5lcik7IiwiLypcbiAqIGpRdWVyeSB0aHJvdHRsZSAvIGRlYm91bmNlIC0gdjEuMSAtIDMvNy8yMDEwXG4gKiBodHRwOi8vYmVuYWxtYW4uY29tL3Byb2plY3RzL2pxdWVyeS10aHJvdHRsZS1kZWJvdW5jZS1wbHVnaW4vXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxMCBcIkNvd2JveVwiIEJlbiBBbG1hblxuICogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgbGljZW5zZXMuXG4gKiBodHRwOi8vYmVuYWxtYW4uY29tL2Fib3V0L2xpY2Vuc2UvXG4gKi9cbihmdW5jdGlvbihiLGMpe3ZhciAkPWIualF1ZXJ5fHxiLkNvd2JveXx8KGIuQ293Ym95PXt9KSxhOyQudGhyb3R0bGU9YT1mdW5jdGlvbihlLGYsaixpKXt2YXIgaCxkPTA7aWYodHlwZW9mIGYhPT1cImJvb2xlYW5cIil7aT1qO2o9ZjtmPWN9ZnVuY3Rpb24gZygpe3ZhciBvPXRoaXMsbT0rbmV3IERhdGUoKS1kLG49YXJndW1lbnRzO2Z1bmN0aW9uIGwoKXtkPStuZXcgRGF0ZSgpO2ouYXBwbHkobyxuKX1mdW5jdGlvbiBrKCl7aD1jfWlmKGkmJiFoKXtsKCl9aCYmY2xlYXJUaW1lb3V0KGgpO2lmKGk9PT1jJiZtPmUpe2woKX1lbHNle2lmKGYhPT10cnVlKXtoPXNldFRpbWVvdXQoaT9rOmwsaT09PWM/ZS1tOmUpfX19aWYoJC5ndWlkKXtnLmd1aWQ9ai5ndWlkPWouZ3VpZHx8JC5ndWlkKyt9cmV0dXJuIGd9OyQuZGVib3VuY2U9ZnVuY3Rpb24oZCxlLGYpe3JldHVybiBmPT09Yz9hKGQsZSxmYWxzZSk6YShkLGYsZSE9PWZhbHNlKX19KSh0aGlzKTsiLCJmdW5jdGlvbiBTbm93KHgsIHksIHNpemUsIHZlbG9jaXR5KSB7ICAgICBcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICB0aGlzLnlQb3MgPSB5OyBcbiAgICB0aGlzLnhQb3MgPSB4OyAgIFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTbm93OyIsInZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKTtcbnZhciBTbm93ID0gcmVxdWlyZSgnLi9zbm93Jyk7XG5cblxuXG4vLyBqdXN0IHNub3cgdG8gYmVnaW4gd2l0aCAvL1xuXG5cbmZ1bmN0aW9uIFNub3dmaWVsZChlbCkge1xuXHR0aGlzLmVsZW1lbnQgPSBlbDtcblx0dGhpcy5jYW52YXMgPSBudWxsO1xuXHR0aGlzLndlYXRoZXJUeXBlID0gJ3Nub3cnO1xuXHR0aGlzLm1heFZlbG9jaXR5ID0gMjc1O1xuXHR0aGlzLm1pblZlbG9jaXR5ID0gMTAwO1xuXHR0aGlzLnNub3dGbGFrZXMgPSAzMDA7XG5cdHRoaXMuaW5pdCgpO1xufVxuXG5Tbm93ZmllbGQucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHRcdCBcbiAgICBcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpOyBcblxuXHR0aGlzLmNhbnZhcyA9IGNhbnZhcztcblxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcblxuICAgIHRoaXMuc3RhcnQoKTtcbn07XG5cblNub3dmaWVsZC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHNub3dGbGFrZXMgPSBbXTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc25vd0ZsYWtlczsgaSsrKSB7XG5cdFx0c25vd0ZsYWtlc1tpXSA9IHRoaXMuc25vd0hhbmRsZXIoc25vd0ZsYWtlc1tpXSk7XG5cdH1cblx0dGhpcy5zbm93Rmxha2VzID0gc25vd0ZsYWtlcztcblxuXHR0aGlzLmludGVydmFsKCk7XG59O1xuXG5Tbm93ZmllbGQucHJvdG90eXBlLnNub3dIYW5kbGVyID0gZnVuY3Rpb24oY3VycmVudFNub3dGbGFrZSxzbm93Rmxha2VTdGF0dXMpIHtcblx0dmFyIHN0YXJ0UG9pbnQ7XG5cdGlmKHNub3dGbGFrZVN0YXR1cyA9PT0gJ2RpZWQnKSB7XG5cdFx0c3RhcnRQb2ludCA9IDA7XG5cdH0gZWxzZSB7XG5cdFx0c3RhcnRQb2ludCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLmhlaWdodCk7XG5cdH1cdFxuXHRjdXJyZW50U25vd0ZsYWtlID0gbmV3IFNub3coTWF0aC5yYW5kb20oKSp0aGlzLndpZHRoLCBzdGFydFBvaW50LCBNYXRoLnJhbmRvbSgpKjIrMSwoTWF0aC5yYW5kb20oKSoodGhpcy5tYXhWZWxvY2l0eSAtIHRoaXMubWluVmVsb2NpdHkpKSt0aGlzLm1pblZlbG9jaXR5KTtcblx0cmV0dXJuIGN1cnJlbnRTbm93Rmxha2U7XG59XG5cblNub3dmaWVsZC5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXHR2YXIgYmFja2dyb3VuZCA9IG5ldyBJbWFnZSgpO1xuXHRiYWNrZ3JvdW5kLnNyYyA9ICcvaW1nL29wdGltaXNlZC9uYXR1cmUtaW1hZ2VzLmpwZyc7XG5cdGJhY2tncm91bmQuc2NvcGUgPSB0aGlzO1xuXHRiYWNrZ3JvdW5kLmJhc2VIZWlnaHQgPSAxMDgwO1xuXHRiYWNrZ3JvdW5kLmJhc2VXaWR0aCA9IDE5MjA7IFxuXHRiYWNrZ3JvdW5kLndpZHRoID0gYmFja2dyb3VuZC5iYXNlV2lkdGg7XG5cdGJhY2tncm91bmQuaGVpZ2h0ID0gYmFja2dyb3VuZC5iYXNlSGVpZ2h0O1xuXHRiYWNrZ3JvdW5kLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZCwwLDAsYmFja2dyb3VuZC53aWR0aCxiYWNrZ3JvdW5kLmhlaWdodCk7XG5cdFx0dmFyIF90aGlzID0gYmFja2dyb3VuZC5zY29wZTtcblxuXHRcdGN0eC5maWxsU3R5bGUgPSAoJyNGRkZGRkYnKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgX3RoaXMuc25vd0ZsYWtlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgIHZhciBzbm93Rmxha2UgPSBfdGhpcy5zbm93Rmxha2VzW2ldO1xuXHQgICAgICAgIGN0eC5maWxsUmVjdChzbm93Rmxha2UueFBvcywgc25vd0ZsYWtlLnlQb3MsIHNub3dGbGFrZS5zaXplLCBzbm93Rmxha2Uuc2l6ZSk7XG5cdCAgICB9XG5cdH07XG59O1xuXG5Tbm93ZmllbGQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgZHQgPSAxIC8gdGhpcy5mcHM7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNub3dGbGFrZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgc25vd0ZsYWtlID0gdGhpcy5zbm93Rmxha2VzW2ldO1xuXHRcdHNub3dGbGFrZS55UG9zICs9IGR0ICogc25vd0ZsYWtlLnZlbG9jaXR5O1xuXG5cdFx0aWYoc25vd0ZsYWtlLnlQb3MgPiB0aGlzLmhlaWdodCkge1xuXHRcdFx0dGhpcy5zbm93Rmxha2VzW2ldID0gdGhpcy5zbm93SGFuZGxlcih0aGlzLnNub3dGbGFrZXNbaV0sJ2RpZWQnKTtcblx0XHR9XG5cdH1cbn07XG5cblNub3dmaWVsZC5wcm90b3R5cGUuaW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcblx0dGhpcy51cGRhdGUoKTtcbiAgICB0aGlzLmRyYXcoKTtcblx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmludGVydmFsLmJpbmQodGhpcykpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNub3dmaWVsZDsiXX0=
