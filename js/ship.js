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

	Ship.prototype.rotate = function(theta) {
		var self = this;
		self.thetathrust+=theta;
	};

	Ship.prototype.move = function(force) {
		var self = this;
		self.forcethrust+=force;
		//NEEDS TO BE A VECTOR
	};

	Ship.prototype.position = function() {
		var self = this;
		var layers = self.layers;
		var timer = Date.now() * 0.0001;
		for(var i=0;i<layers.length;i++) {
			layers[i].position.y += self.forcethrust;
			layers[i].rotation.y = timer  * ((i * 1.5) || 1) + self.thetathrust;;
			
		}
		self.group.rotation.z += self.thetathrust;
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