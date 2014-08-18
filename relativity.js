var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Relativity = (function(thruxt) {
	"use strict";
	
	var c = 299792458;
	var c2 = 299792458 * 299792458;

	var timeDilation  = function (elapsed, velocity2) { return (elapsed/Math.sqrt(1-((velocity2)/c2))); };
	


	//Relativity within a Galaxy or Universe
	var Relativity = function(diameter) {
		var self = this;
		self.diameter = diameter;
		self.thickness = thickness;
	};

	Relativity.prototype.perspective = function(x1,y1,x2,y2) {
		var self = this;
		var a = x1, b = self.diameter;
		var a2 = a*a, b2 = b * b;
		var c = Math.sqrt(a2 + b2);
		var c2 = c*c;
		var 2bc = 2*b*c;
		var A = Math.acos((0 - a2 + b2 + c2)/2bc);
		var B = Math.acos((0 + a2 - b2 + c2)/2bc);
		var C = Math.acos((0 + a2 + b2 - c2)/2bc);
	};

	Relativity.make = function() {
		return new Relativity();
	};

	thruxt.isRelativity = function(obj) {return obj instanceof Relativity};

	return Relativity.make;

})(Thruxt);