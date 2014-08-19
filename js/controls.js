var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Controls = (function() {
	"use strict";

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	//Stop Event Bubblicious
	var nobubble = function(e) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	//desktop controls
	var desktop = function() {

		var keypress = function(e) {
			var lt = 39;
			var rt = 37;
			var up = 38;
			var dn = 40;
			switch(e.which) {
				case lt: $.trigger("left"); nobubble(e); break;
				case rt: $.trigger("right"); nobubble(e); break;
				case up: $.trigger("forward"); nobubble(e); break;
				case dn: $.trigger("backward"); nobubble(e); break;
			}
		};

		//Events
		document.body.on("keydown",keypress);

	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	//touchpad controls
	var touchpad = function() {

	};

	//Temp
	desktop();


})();