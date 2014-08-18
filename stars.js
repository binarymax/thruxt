var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Starfield = (function() {
	"use strict";

	var colors = "efffef,efffef,efffef,efffef,efffef,efffef,efffef,efffef,efffef,efffef,9db4ff,aabfff,cad8ff,fbf8ff,fff4e8,ffddb4,ffbd6f,f84235,ba3059,605170".split(',').map(function(hex){return Thruxt.hex2rgba(hex,"0.8")});

	var stars = {};

	//------------------------------------------------------------------
	//Draws a star
	var Star = function(layer,x,y,z) {
		var self = this;
		var r = Thruxt.rand1(2*z)+1;
		var c = colors[Thruxt.rand1(colors.length)];
		var sw = Math.floor(Thruxt.viewWidth/layer.width);
		var sh = Math.floor(Thruxt.viewHeight/layer.height);
		var ox = Thruxt.rand1(layer.width);
		var oy = Thruxt.rand1(layer.height);
		var render = function(layer,node) {
			var context = layer.context;
			var x = node.x*sw+ox;
			var y = node.y*sh+oy;
			context.beginPath();
			context.fillStyle = c;
			context.arc(x, y, r, 0, Thruxt._360, false);
			context.closePath();
			context.fill();
		}
		var sprite = Thruxt.Sprite(render);
		layer.add(sprite,x,y);
	};

	//------------------------------------------------------------------
	//Draws a starfield layer
	var stars = function(layer,zIndex,density) {
		var s = Thruxt.rand1(density);
		for(var i=0,x,y;i<s;i++) {
			x = Thruxt.rand1(layer.width);
			y = Thruxt.rand1(layer.height);
			star(layer,x,y,z+1);
		};
	};

	var make = function(universe,zIndex,density){
		var layer = Thruxt.Layer(universe,zIndex);
		stars(layer,density);
	};

	return make;

})();