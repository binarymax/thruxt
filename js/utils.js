var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

(function(thruxt){
	"use strict";

	var _width   = thruxt.width      = window.innerWidth;
	var _height  = thruxt.height     = window.innerHeight;
	var _centerx = thruxt.centerx    = _width>>1;
	var _centery = thruxt.centery    = _height>>1;
	var _tau     = thruxt.tau        = Math.PI * 2;
	var _ratio   = thruxt.ratio      = _width/_height;
	var _halfx   = thruxt.halfx      = _width / 2;
	var _halfy   = thruxt.halfy      = _height / 2;

	var _force  = thruxt.force     = 0.1;
	var _theta  = thruxt.theta     = 0.1;
	var _zoom   = thruxt.zoom      = 5;


	//------------------------------------------------------------------
	//requestAnimationFrame
	thruxt.requestAnimationFrame = (function() {
		if(window.requestAnimationFrame) return function(callback) { window.requestAnimationFrame(callback); }
		else return (
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			}
		);
	})();

	//------------------------------------------------------------------
	//Initializes a canvas width and height
	var initCanvas = thruxt.initCanvas = function(canvas,width,height,z) {
		if (typeof canvas === "string") canvas = document.getElementById(canvas);
		canvas.width  = width||_width;
		canvas.height = height||_height;
		canvas.style.width  = canvas.width + 'px';
		canvas.style.height = canvas.height + 'px';
		if (z) canvas.style.zIndex = z;
		return canvas;
	};

	//------------------------------------------------------------------
	//Creates a canvas element and adds it to the DOM
	var makeCanvas = thruxt.makeCanvas = function(z) {
		var layers = document.getElementById("layers");
		var canvas = document.createElement("canvas"); 
		canvas.className = "layer";
		layers.appendChild(canvas);
		return initCanvas(canvas,_width,_height,z);
	};
	
	//------------------------------------------------------------------
	//Initializes the context of a canvas
	var initContext = thruxt.initContext =  function(canvas) {
		var context = canvas.getContext("2d");
		return context;
	};

	//------------------------------------------------------------------	
	//Random number helpers
	var rand1 = thruxt.rand1 = function(max){ return Math.floor(Math.random()*max); }
	var rand2 = thruxt.rand2 = function(min,max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

	//------------------------------------------------------------------	
	//Converts a hex color to rgba
	var hex2rgba = thruxt.hex2rgba = function(hex) {
		var r = parseInt(hex.substr(0,2),16).toString();
		var g = parseInt(hex.substr(2,2),16).toString();
		var b = parseInt(hex.substr(4,2),16).toString();
		var a = hex.length>6?parseInt(hex.substr(4,2),16).toString():0.8;
		return "rgba("+r+","+g+","+b+","+a+")";
	}

	//------------------------------------------------------------------	
	//Converts a hex color to a three rgb color
	var hex2three = thruxt.hex2three = function(hex) {
		var r = parseInt(hex.substr(0,2),16).toString();
		var g = parseInt(hex.substr(2,2),16).toString();
		var b = parseInt(hex.substr(4,2),16).toString();
		return [r/255,g/255,b/255];
	};

	var angle2radians = thruxt.angle2radians = function(angle) {
		var radians = angle/360*_tau;
		return radians;
	};

	//------------------------------------------------------------------	
	//Converts 2d cartesian coordinates to a buffer offset
	var offset = thruxt.offset = function(width) {
		return function(x,y) {
			return x+y*width;
		}
	};

	//Converts a buffer offset to 2d cartesian coordinates
	var points = thruxt.points = function(width) {
		return function(off) {
			var y = Math.floor(off/width);
			var x = off%width;
			return {x:x,y:y};
		}
	};

	//------------------------------------------------------------------	
	// ID constructors
	var xyid = thruxt.xyid = function(x,y){
		return x.toString() + "_" + y.toString();
	};

	var xyzid = thruxt.xyzid = function(x,y,z){
		return x.toString() + "_" + y.toString() + "_" + z.toString();
	};

	//------------------------------------------------------------------	
	//Coordinate Distance
	var square = thruxt.square = function(x) {
		return x*x;
	};

	var distance2D = thruxt.distance2D = function (x1,y1,x2,y2) { 
		return Math.sqrt(Thruxt.square(x2-x1) + Thruxt.square(y2-y1));
	};

	var distance3D = thruxt.distance2D = function (x1,y1,z1,x2,y2,z2) { 
		return Math.sqrt(Thruxt.square(x2-x1) + Thruxt.square(y2-y1) + Thruxt.square(z2-z1));
	};

	//------------------------------------------------------------------	
	//Converts cartesian coordinates to polar
	var polar = thruxt.polar = function(x,y){
		var r = Math.pow((Math.pow(x,2) + Math.pow(y,2)),0.5);
		var theta = Math.atan(y/x)*360/2/Math.PI;
		if (x >= 0 && y >= 0) {
			theta = theta;
		} else if (x < 0 && y >= 0) {
			theta = 180 + theta;
		} else if (x < 0 && y < 0) {
			theta = 180 + theta;
		} else if (x > 0 && y < 0) {
			theta = 360 + theta;
		}
		return {theta:theta,force:r,radians:angle2radians(theta-90)};
	};

})(Thruxt);