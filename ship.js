var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Ship = (function() {
	"use strict";

	//------------------------------------------------------------------
	//Draws a ship
	var ship = function(layer,x,y,z) {
		var r = Thruxt.rand2(1,3);
		var render = function(layer,node){
			var context = layer.context;
			var w = 100;
			var h = 20;
			var x = node.x-(w>>1);
			var y = node.y-(h>>1);
			context.fillStyle = "rgba(250,255,250,0.8)";
			context.fillRect(x, y, w, h);
		}
		var sprite = Thruxt.Sprite(render);
		layer.add(sprite,x,y,z);
	};


	var make = function(galaxy) {
		var zIndex = 100;
		var layer  = Thruxt.Layer(galaxy,zIndex);
		ship(layer,Thruxt.centerx,Thruxt.centery,galaxy.zref(zIndex));
	};

	return make;

})();