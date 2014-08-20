var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Game = (function() {
	"use strict";

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Constructor
	var Game = function() {
		var self = this;

		var scene = self.scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0x000000, 0.0007 );

		var renderer = self.renderer = new THREE.WebGLRenderer();
		renderer.setSize( Thruxt.width, Thruxt.height );

		self.starfield = Thruxt.Starfield(self.scene,0,0,505,10000);
		self.ship = Thruxt.Ship(self.scene,0,0,1200);

		self.stats = new Stats();
		$("#stats").appendChild( self.stats.domElement );

		Thruxt.Controls.desktop();

	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Plots a course
	var plot = Game.prototype.plot = function() {

	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Renders the scene
	var render = Game.prototype.render = function() {
		var self = this;
		var camera = self.ship.camera;

		Thruxt.requestAnimationFrame(function(){self.render();});

		self.ship.position();

		self.renderer.render( self.scene, self.ship.camera );

		self.stats.update();


	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Initializes a game
	var load = Game.prototype.load = function(game) {
		var self = this;

		//Loaded from a saved game
		if (game) console.log(game);

		/*
		//Objects
		var universe = self.universe = Thruxt.Universe();
		var galaxy = self.galaxy = Thruxt.Galaxy(universe,100000,2400);		
		*/

		self.render();
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Calls the constructor and returns a new game
	Game.make = function(){
		var game = new Game();
		return game;
	}

	return Game.make;

})();