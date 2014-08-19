var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Universe = (function() {
	"use strict";

	var galaxies  = {};

	var Universe = function() {
		var self = this;
		self.x = 0;
		self.y = 0;
		self.theta = 0;
	};

	Universe.prototype.add = function(galaxy,x,y) {
		var galaxyid = x+"_"+y;
		galaxies[galaxyid] = galaxy;
	};

	Universe.prototype.each = function(callback) {
		for(var l in galaxies) {
			if(galaxies.hasOwnProperty(l)) {
				callback(galaxies[l]);
			}
		}
	}

	Universe.prototype.render = function() {
		var self = this;
		self.each(function(galaxy){
			galaxy.render();
		});
	};

	Universe.make = function() {
		return new Universe();
	};

	return Universe.make;

})();