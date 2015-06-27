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
function Snow(xPos, yPos, size, xvelocity, yvelocity) {     
    this.size = size;
    this.xvelocity = xvelocity;
    this.yvelocity = yvelocity;
    this.yPos = yPos;
    this.xPos = xPos;
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
	this.maxXVelocity = 3;
	this.minXVelocity = 1;
	this.maxYVelocity = 4;
	this.minYVelocity = 2;
	this.snowFlakes = 300;
	this.fps = 60;
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
	var xvelocity;
	if(snowFlakeStatus === 'died') {
		startPoint = 0;
	} else {
		startPoint = Math.random()*this.height;
	}
	xvelocity = (Math.random()*(this.maxXVelocity - this.minXVelocity))+this.minXVelocity;
	yvelocity = (Math.random()*(this.maxYVelocity - this.minYVelocity))+this.minYVelocity;

	currentSnowFlake = new Snow(Math.random()*this.width, startPoint, Math.random()*2+1, xvelocity, yvelocity);
	return currentSnowFlake;
};

Snowfield.prototype.draw = function() {
	var ctx = this.canvas.getContext('2d');

	var background = new Image();
	background.src = '/img/optimised/nature-images.jpg';
	background.scope = this; 
	background.width = this.width;
	background.height =	this.height;
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
	for(var i = 0; i < this.snowFlakes.length; i++) {
		var snowFlake = this.snowFlakes[i];
		snowFlake.yPos += snowFlake.yvelocity;
		snowFlake.xPos += snowFlake.xvelocity;

		if(snowFlake.yPos > this.height) {
			this.snowFlakes[i] = this.snowHandler(this.snowFlakes[i],'died');
		}
	}
};

Snowfield.prototype.interval = function() {
	this.update();
    this.draw();
    var self = this;
    setTimeout(function(){
    	window.requestAnimationFrame(self.interval.bind(self));
    },1000/self.fps)
	
}


module.exports = Snowfield;
},{"./debounce":2,"./snow":3}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcTGVvXFxEb2N1bWVudHNcXERldmVsb3BtZW50XFxndWxwc3RhcnRcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiQzovVXNlcnMvTGVvL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ndWxwc3RhcnQvYXBwL2pzL3NyYy9hcHAuanMiLCJDOi9Vc2Vycy9MZW8vRG9jdW1lbnRzL0RldmVsb3BtZW50L2d1bHBzdGFydC9hcHAvanMvc3JjL2RlYm91bmNlLmpzIiwiQzovVXNlcnMvTGVvL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ndWxwc3RhcnQvYXBwL2pzL3NyYy9zbm93LmpzIiwiQzovVXNlcnMvTGVvL0RvY3VtZW50cy9EZXZlbG9wbWVudC9ndWxwc3RhcnQvYXBwL2pzL3NyYy93ZWF0aGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFNub3dmaWVsZCA9IHJlcXVpcmUoJy4vd2VhdGhlcicpO1xyXG5cclxudmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcclxuXHJcbnZhciB3ZWF0aGVyID0gbmV3IFNub3dmaWVsZChjb250YWluZXIpOyIsIi8qXHJcbiAqIGpRdWVyeSB0aHJvdHRsZSAvIGRlYm91bmNlIC0gdjEuMSAtIDMvNy8yMDEwXHJcbiAqIGh0dHA6Ly9iZW5hbG1hbi5jb20vcHJvamVjdHMvanF1ZXJ5LXRocm90dGxlLWRlYm91bmNlLXBsdWdpbi9cclxuICogXHJcbiAqIENvcHlyaWdodCAoYykgMjAxMCBcIkNvd2JveVwiIEJlbiBBbG1hblxyXG4gKiBEdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCBsaWNlbnNlcy5cclxuICogaHR0cDovL2JlbmFsbWFuLmNvbS9hYm91dC9saWNlbnNlL1xyXG4gKi9cclxuKGZ1bmN0aW9uKGIsYyl7dmFyICQ9Yi5qUXVlcnl8fGIuQ293Ym95fHwoYi5Db3dib3k9e30pLGE7JC50aHJvdHRsZT1hPWZ1bmN0aW9uKGUsZixqLGkpe3ZhciBoLGQ9MDtpZih0eXBlb2YgZiE9PVwiYm9vbGVhblwiKXtpPWo7aj1mO2Y9Y31mdW5jdGlvbiBnKCl7dmFyIG89dGhpcyxtPStuZXcgRGF0ZSgpLWQsbj1hcmd1bWVudHM7ZnVuY3Rpb24gbCgpe2Q9K25ldyBEYXRlKCk7ai5hcHBseShvLG4pfWZ1bmN0aW9uIGsoKXtoPWN9aWYoaSYmIWgpe2woKX1oJiZjbGVhclRpbWVvdXQoaCk7aWYoaT09PWMmJm0+ZSl7bCgpfWVsc2V7aWYoZiE9PXRydWUpe2g9c2V0VGltZW91dChpP2s6bCxpPT09Yz9lLW06ZSl9fX1pZigkLmd1aWQpe2cuZ3VpZD1qLmd1aWQ9ai5ndWlkfHwkLmd1aWQrK31yZXR1cm4gZ307JC5kZWJvdW5jZT1mdW5jdGlvbihkLGUsZil7cmV0dXJuIGY9PT1jP2EoZCxlLGZhbHNlKTphKGQsZixlIT09ZmFsc2UpfX0pKHRoaXMpOyIsImZ1bmN0aW9uIFNub3coeFBvcywgeVBvcywgc2l6ZSwgeHZlbG9jaXR5LCB5dmVsb2NpdHkpIHsgICAgIFxyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgIHRoaXMueHZlbG9jaXR5ID0geHZlbG9jaXR5O1xyXG4gICAgdGhpcy55dmVsb2NpdHkgPSB5dmVsb2NpdHk7XHJcbiAgICB0aGlzLnlQb3MgPSB5UG9zO1xyXG4gICAgdGhpcy54UG9zID0geFBvcztcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU25vdztcdCIsInZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKTtcclxudmFyIFNub3cgPSByZXF1aXJlKCcuL3Nub3cnKTtcclxuXHJcblxyXG5cclxuLy8ganVzdCBzbm93IHRvIGJlZ2luIHdpdGggLy9cclxuXHJcblxyXG5mdW5jdGlvbiBTbm93ZmllbGQoZWwpIHtcclxuXHR0aGlzLmVsZW1lbnQgPSBlbDtcclxuXHR0aGlzLmNhbnZhcyA9IG51bGw7XHJcblx0dGhpcy53ZWF0aGVyVHlwZSA9ICdzbm93JztcclxuXHR0aGlzLm1heFhWZWxvY2l0eSA9IDM7XHJcblx0dGhpcy5taW5YVmVsb2NpdHkgPSAxO1xyXG5cdHRoaXMubWF4WVZlbG9jaXR5ID0gNDtcclxuXHR0aGlzLm1pbllWZWxvY2l0eSA9IDI7XHJcblx0dGhpcy5zbm93Rmxha2VzID0gMzAwO1xyXG5cdHRoaXMuZnBzID0gNjA7XHJcblx0dGhpcy5pbml0KCk7XHJcbn1cclxuXHJcblNub3dmaWVsZC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICBcclxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7IFxyXG5cclxuXHR0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuXHJcbiAgICB0aGlzLnN0YXJ0KCk7XHJcbn07XHJcblxyXG5cclxuXHJcblNub3dmaWVsZC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgc25vd0ZsYWtlcyA9IFtdO1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNub3dGbGFrZXM7IGkrKykge1xyXG5cdFx0c25vd0ZsYWtlc1tpXSA9IHRoaXMuc25vd0hhbmRsZXIoc25vd0ZsYWtlc1tpXSk7XHJcblx0fVxyXG5cdHRoaXMuc25vd0ZsYWtlcyA9IHNub3dGbGFrZXM7XHJcblx0dGhpcy5pbnRlcnZhbCgpO1xyXG59O1xyXG5cclxuU25vd2ZpZWxkLnByb3RvdHlwZS5zbm93SGFuZGxlciA9IGZ1bmN0aW9uKGN1cnJlbnRTbm93Rmxha2Usc25vd0ZsYWtlU3RhdHVzKSB7XHJcblx0dmFyIHN0YXJ0UG9pbnQ7XHJcblx0dmFyIHh2ZWxvY2l0eTtcclxuXHRpZihzbm93Rmxha2VTdGF0dXMgPT09ICdkaWVkJykge1xyXG5cdFx0c3RhcnRQb2ludCA9IDA7XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0YXJ0UG9pbnQgPSBNYXRoLnJhbmRvbSgpKnRoaXMuaGVpZ2h0O1xyXG5cdH1cclxuXHR4dmVsb2NpdHkgPSAoTWF0aC5yYW5kb20oKSoodGhpcy5tYXhYVmVsb2NpdHkgLSB0aGlzLm1pblhWZWxvY2l0eSkpK3RoaXMubWluWFZlbG9jaXR5O1xyXG5cdHl2ZWxvY2l0eSA9IChNYXRoLnJhbmRvbSgpKih0aGlzLm1heFlWZWxvY2l0eSAtIHRoaXMubWluWVZlbG9jaXR5KSkrdGhpcy5taW5ZVmVsb2NpdHk7XHJcblxyXG5cdGN1cnJlbnRTbm93Rmxha2UgPSBuZXcgU25vdyhNYXRoLnJhbmRvbSgpKnRoaXMud2lkdGgsIHN0YXJ0UG9pbnQsIE1hdGgucmFuZG9tKCkqMisxLCB4dmVsb2NpdHksIHl2ZWxvY2l0eSk7XHJcblx0cmV0dXJuIGN1cnJlbnRTbm93Rmxha2U7XHJcbn07XHJcblxyXG5Tbm93ZmllbGQucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcblx0dmFyIGJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcclxuXHRiYWNrZ3JvdW5kLnNyYyA9ICcvaW1nL29wdGltaXNlZC9uYXR1cmUtaW1hZ2VzLmpwZyc7XHJcblx0YmFja2dyb3VuZC5zY29wZSA9IHRoaXM7IFxyXG5cdGJhY2tncm91bmQud2lkdGggPSB0aGlzLndpZHRoO1xyXG5cdGJhY2tncm91bmQuaGVpZ2h0ID1cdHRoaXMuaGVpZ2h0O1xyXG5cdGJhY2tncm91bmQub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQsMCwwLGJhY2tncm91bmQud2lkdGgsYmFja2dyb3VuZC5oZWlnaHQpO1xyXG5cdFx0dmFyIF90aGlzID0gYmFja2dyb3VuZC5zY29wZTtcclxuXHJcblx0XHRjdHguZmlsbFN0eWxlID0gKCcjRkZGRkZGJyk7XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgX3RoaXMuc25vd0ZsYWtlcy5sZW5ndGg7IGkrKykge1xyXG5cdCAgICAgICAgdmFyIHNub3dGbGFrZSA9IF90aGlzLnNub3dGbGFrZXNbaV07XHJcblx0ICAgICAgICBjdHguZmlsbFJlY3Qoc25vd0ZsYWtlLnhQb3MsIHNub3dGbGFrZS55UG9zLCBzbm93Rmxha2Uuc2l6ZSwgc25vd0ZsYWtlLnNpemUpO1xyXG5cdCAgICB9XHJcblx0fTtcclxufTtcclxuXHJcblNub3dmaWVsZC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc25vd0ZsYWtlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIHNub3dGbGFrZSA9IHRoaXMuc25vd0ZsYWtlc1tpXTtcclxuXHRcdHNub3dGbGFrZS55UG9zICs9IHNub3dGbGFrZS55dmVsb2NpdHk7XHJcblx0XHRzbm93Rmxha2UueFBvcyArPSBzbm93Rmxha2UueHZlbG9jaXR5O1xyXG5cclxuXHRcdGlmKHNub3dGbGFrZS55UG9zID4gdGhpcy5oZWlnaHQpIHtcclxuXHRcdFx0dGhpcy5zbm93Rmxha2VzW2ldID0gdGhpcy5zbm93SGFuZGxlcih0aGlzLnNub3dGbGFrZXNbaV0sJ2RpZWQnKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5Tbm93ZmllbGQucHJvdG90eXBlLmludGVydmFsID0gZnVuY3Rpb24oKSB7XHJcblx0dGhpcy51cGRhdGUoKTtcclxuICAgIHRoaXMuZHJhdygpO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgXHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNlbGYuaW50ZXJ2YWwuYmluZChzZWxmKSk7XHJcbiAgICB9LDEwMDAvc2VsZi5mcHMpXHJcblx0XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNub3dmaWVsZDsiXX0=
