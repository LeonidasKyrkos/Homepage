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