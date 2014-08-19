/* =================================================================================
 *
 * THRUXT - the galaxy eater
 *
 * Creature devaours ateroids, moons, planets, stars, galaxies
 * 
 * Lightears for speed/time.
 *
 * Sounds are interpreted by Galaxy radiation
 *
 * ================================================================================= */
var Thruxt = window.Thruxt = (function(thruxt){
	"use strict";

	thruxt = {};

	thruxt.create = function() {
		var container = $("#container");
		var game = thruxt.Game();
		container.appendChild( game.renderer.domElement );
		game.load();
	};

	thruxt.load = function(){
		var game = thruxt.Game();
		game.load();
	};

	thruxt.destroy = function() {
		thruxt.Game.destroy();
	};

	thruxt.save = function() {
		thruxt.Game.save();
	};

	thruxt.start = function(){
		thruxt.create();
		$.trigger("ready");

	};

	return thruxt;

})(Thruxt);