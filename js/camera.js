var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Camera = (function() {
	"use strict";

	//------------------------------------------------------------------
	//Makes the camera
	var Camera = function() {
		var self = this;
		var threecam = self.threecam = new THREE.PerspectiveCamera( 50, Thruxt.ratio, 1, 2400 );
		var controls = self.controls = new THREE.FlyControls(threecam);
		threecam.position.x = 0;
		threecam.position.y = 0;
		threecam.position.z = 1600;
		self.thetathrust = 0;
		self.forcethrust = 0;
		self.theta = 0;
		self.force = 0;
	}

	Camera.prototype.rotate = function(theta) {
		var self = this;
		self.thetathrust+=theta;
	};

	Camera.prototype.move = function(force) {
		var self = this;
		self.forcethrust+=force;
		//console.log(self.forcethrust);
	};

	Camera.prototype.position = function(force) {
		var self = this;
		self.threecam.position.y += self.forcethrust;
		self.threecam.rotation.z += self.thetathrust;

		//$.trigger("shipmove",self.threecam.position);

	};

	var make = function() {

		var camera   = new Camera();

		//Bind events
		$.on("left",     function(){ camera.rotate  (Thruxt.theta); });
		$.on("right",    function(){ camera.rotate (-Thruxt.theta); });
		$.on("forward",  function(){ camera.move    (Thruxt.force); });
		$.on("backward", function(){ camera.move   (-Thruxt.force); });

		$.on("position", function(){ camera.position(); });

		return camera;
	};

	return make;

})();