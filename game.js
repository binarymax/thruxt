var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Game = (function() {
	"use strict";

	var keypress = function(e) {
		var lt = 39;
		var rt = 37;
		var up = 38;
		var dn = 40;
		switch(e.which) {
			case lt: $.trigger("left"); break;
			case rt: $.trigger("right"); break;
			case up: $.trigger("forward"); break;
			case dn: $.trigger("backward"); break;
		}
	};

	//Constructor
	var Game = function() {
		var self = this;
	};

	//Plots a course
	var plot = Game.prototype.plot = function() {

	};

	//Initializes a game
	var load = Game.prototype.load = function(game) {
		var self = this;

		if (game) console.log(game);

		//Objects
		var universe = self.universe = Thruxt.Universe();
		var galaxy = self.galaxy = Thruxt.Galaxy(universe,100000,2400);
		Thruxt.Starfield(galaxy,505,505);
		Thruxt.Ship(galaxy,1200);

		//Draw
		(function animation(){
			Thruxt.requestAnimationFrame(animation);
			universe.render();
		})();

		//Events
		document.body.on("keydown",keypress);
	}

	Game.make = function(){
		return new Game();
	}

	return Game.make;

})();