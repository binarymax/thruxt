var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Galaxy = (function() {
	"use strict";

	var layers  = {};

	var Galaxy = function(universe,diameter,thickness) {
		var self = this;
		self.d = diameter;
		self.t = thickness;
		self.thetathrust = 0;
		self.forcethrust = 0;
		self.theta = 0;
		self.force = 0;
		self.x = 0;
		self.y = 0;
		universe.add(self);
	};

	Galaxy.prototype.zref = function(z) {
		var self = this;
		return self.d - self.t + z;
	}


	Galaxy.prototype.add = function(layer,x,y) {
		var layerid = x+"_"+y;
		layers[layerid] = layer;
	};

	Galaxy.prototype.each = function(callback) {
		for(var l in layers) {
			if(layers.hasOwnProperty(l)) {
				callback(layers[l]);
			}
		}
	}

	Galaxy.prototype.render = function(init) {
		var self = this;
		self.theta += self.thetathrust;
		if(self.theta>=360) self.theta = 0;
		if(self.theta<0)    self.theta = 359;
		self.each(function(layer){
			layer.render();
			Thruxt.rotate(layer.canvas,self.theta);
		});
	};

	Galaxy.prototype.rotate = function(theta) {
		var self = this;
		self.thetathrust+=theta;
	};

	Galaxy.prototype.move = function(force) {
		var self = this;
		self.forcethrust+=force;
	};

	Galaxy.make = function(universe,diameter,thickness) {
		var galaxy = new Galaxy(universe,diameter,thickness);

		$.on("left",function(){ galaxy.rotate(1); });
		$.on("right",function(){ galaxy.rotate(-1); });
		$.on("forward",function(){ galaxy.move(1); });
		$.on("backward",function(){ galaxy.move(-1); });

		return galaxy;
	};

	return Galaxy.make;

})();