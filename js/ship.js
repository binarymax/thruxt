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
		self.v = new THREE.Vector3(0,0,0);

		self.force = 0;
		self.theta = 0;
		self.forcethrust = 0;
		self.thetathrust = 0

		var camera = self.camera = new THREE.PerspectiveCamera( 50, Thruxt.ratio, 1, 2400 );
		var controls = self.controls = new THREE.FlyControls(camera);

		camera.position.x = x;
		camera.position.y = y;
		camera.position.z = z+400;

		var layers = self.layers = [];

		var group = self.group = new THREE.Object3D();


		var map = THREE.ImageUtils.loadTexture( '/textures/clouds/turquois-opaque.jpg' );
		map.wrapS = map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 16;

		var material = new THREE.MeshLambertMaterial( { ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide } );
		self.layers.push(new THREE.Mesh( new THREE.SphereGeometry( 50, 40, 40 ), material ));
		layers[0].position.set( x, y, z );
		group.add(layers[0]);


		var map1 = THREE.ImageUtils.loadTexture('/textures/clouds/grey-waves.jpg');
		map1.minFilter = map1.magFilter = THREE.LinearFilter;
		map1.anisotropy = 4;

		var material1 = new THREE.MeshBasicMaterial( { map: map1, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
		self.layers.push(new THREE.Mesh( new THREE.SphereGeometry( 55, 40, 40 ), material1 ));
		layers[1].position.set( x, y, z );
		group.add(layers[1]);


		scene.add(group);


		var light = self.light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 0, 0, 1 );
		scene.add( light );

	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	//Rotate the ship by adding a Vector on the X axis
	var tempr = new THREE.Vector3(0,0,0);
	Ship.prototype.rotate = function(theta) {
		var self = this;
		tempr.setX(theta);
		self.v.add(tempr);

		
		var rot = self.v.angleTo(tempr);
		//self.camera.rotation.z = rot;
		//self.group.rotation.z = rot;

	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	//Move the ship by adding a Vector on the Y axis
	var tempm = new THREE.Vector3(0,0,0);
	Ship.prototype.move = function(force) {
		var self = this;
		tempm.setY(force);
		self.v.add(tempm);
	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Update the zoom of the camera for a render
	Ship.prototype.zoom = function(dist) {
		var self = this;
		if(dist===0) {
			self.camera.position.z  = self.z+400;
		} else {
			self.camera.position.z += dist;
		}

	};	

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Update the position of the ship+camera for a render
	Ship.prototype.position = function() {
		var self = this;
		var layers = self.layers;
		var timer = Date.now() * 0.0001;

		//Travel a vector's distance
		self.camera.position.add(self.v);
		self.group.position.add(self.v);

		//Rotate the layer textures
		for(var i=0;i<layers.length;i++) {
			self.layers[i].rotation.y = timer * ((i *1.15)||1);
		}
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Creates a new ship and sets event handlers
	var make = function(scene,x,y,z) {
		var ship   = new Ship(scene,x,y,z);

		//Bind events
		$.on("left",     function(){ ship.rotate  (Thruxt.theta); });
		$.on("right",    function(){ ship.rotate (-Thruxt.theta); });
		$.on("forward",  function(){ ship.move    (Thruxt.force); });
		$.on("backward", function(){ ship.move   (-Thruxt.force); });

		$.on("zoomin",   function(){ ship.zoom    (Thruxt.zoom); });
		$.on("zoomout",  function(){ ship.zoom   (-Thruxt.zoom); });
		$.on("zoomzero", function(){ ship.zoom    (0); });

		$.on("position", function(){ ship.position(); });		

		return ship;
	};

	return make;

})();