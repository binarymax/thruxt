var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Sprite = (function() {
	"use strict";

	var Sprite = function(render) {
		var self = this;
		self._render = render;
	};

	Sprite.prototype.render = function(layer,node){
		var self = this;
		self._render.call(this,layer,node);
	};

	Sprite.make = function(render) {
		return new Sprite(render);
	};

	Thruxt.isSprite = function(obj) {return obj instanceof Sprite};

	return Sprite.make;

})();