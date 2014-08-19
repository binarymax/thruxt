var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Ship = (function() {
	"use strict";

	//------------------------------------------------------------------
	//Draws a ship
	var Ship = function(scene,x,y,z) {
		var self = this;
		self.x = x;
		self.y = y;
		self.z = z;
		self.force = 0;
		self.theta = 0;
		self.forcethrust = 0;
		self.thetathrust = 0

		var map = THREE.ImageUtils.loadTexture( '/textures/water_over_coral_reef_303786.jpg' );
		map.wrapS = map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 16;

		var material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );
		var object = self.object = new THREE.Mesh( new THREE.SphereGeometry( 40, 40, 40 ), material );
		object.position.set( x, y, z );
		scene.add(object);

		var light = self.light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 0, 0, 1 );
		scene.add( light );

	};

	Ship.prototype.rotate = function(theta) {
		var self = this;
		self.thetathrust+=theta;
	};

	Ship.prototype.move = function(force) {
		var self = this;
		self.forcethrust+=force;
	};

	Ship.prototype.position = function() {
		var timer = Date.now() * 0.0001;
		var self = this;
		self.object.position.y += self.forcethrust;
		self.object.rotation.y = timer;

	}

	var make = function(scene,x,y,z) {
		var ship   = new Ship(scene,x,y,z);

		//Bind events
		$.on("left",     function(){ ship.rotate  (Thruxt.theta); });
		$.on("right",    function(){ ship.rotate (-Thruxt.theta); });
		$.on("forward",  function(){ ship.move    (Thruxt.force); });
		$.on("backward", function(){ ship.move   (-Thruxt.force); });

		$.on("position", function(){ ship.position(); });		

		return ship;
	};

	return make;

})();