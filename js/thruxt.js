/* =================================================================================
 *
 *
 *
 * THRUXT
 *
 * Author: Max Irwin
 * 
 * Copyright(c) 2014
 *
 * 
 *
 * ================================================================================= */
 
var Thruxt = window.Thruxt = (function(thruxt){
	"use strict";

	thruxt = {};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	thruxt.create = function() {
		var container = $("#container");
		var game = thruxt.Game();
		container.appendChild( game.renderer.domElement );
		game.load();
	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	thruxt.load = function(){
		var game = thruxt.Game();
		game.load();
	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	thruxt.destroy = function() {
		thruxt.Game.destroy();
	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	thruxt.save = function() {
		thruxt.Game.save();
	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	thruxt.start = function(){
		thruxt.create();
		$.trigger("ready");

	};

	return thruxt;

})(Thruxt);