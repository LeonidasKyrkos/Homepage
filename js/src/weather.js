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