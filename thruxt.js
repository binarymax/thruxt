/* =================================================================================
 *
 * THRUXT - the galaxy eater
 *
 * Creature devaours ateroids, moons, planets, stars, galaxies
 * 
 * 
 * 
 * Lightears for speed/time.
 *
 *
 * Sounds are interpreted by Galaxy radiation
 *
 * ================================================================================= */
var Thruxt = window.Thruxt = (function(thruxt){
	"use strict";

	thruxt = {};

	thruxt.create = function() {
		console.log(thruxt);
		var game = thruxt.Game();
		game.load();
	};

	thruxt.destroy = function() {
		thruxt.Game.destroy();
	};

	thruxt.save = function() {

	};

	thruxt.load = function(){
		var game = thruxt.Game();
		game.load();
	};

	$.on("ready",function(){
		thruxt.create();
	});

	return thruxt;

})(Thruxt);