var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Starfield = (function() {
	"use strict";

	var colors = "efffef,efffef,efffef,efffef,efffef,efffef,efffef,efffef,efffef,9db4ff,aabfff,cad8ff,fbf8ff,fff4e8,ffddb4,ffbd6f,fff4e8,ffddb4,f84235,ba3059,605170"
					.split(',')
					.map(Thruxt.hex2three);

	//------------------------------------------------------------------
	//Draws a starfield
	var StarField = function(scene,x,y,z,density) {
		var self = this;
		self.scene = scene;
		self.z = z;
		self.draw(x,y,density);
	};


	StarField.prototype.draw = function(x,y,density) {
		var self = this;
		var z = self.z;
		var color;
		var size;
		var material;
		var particles;
		var materials = [];
		var geometry = new THREE.Geometry();

		for (var i=0; i<density; i++) {

			var vertex = new THREE.Vector3();
			vertex.x = x + (Math.random() * 2000 - 1000);
			vertex.y = y + (Math.random() * 2000 - 1000);
			vertex.z = z + (Math.random() * 2000 - 1000);

			geometry.vertices.push( vertex );

		}

		var sprite = THREE.ImageUtils.loadTexture('/textures/circle-white-24.png');

		for (var i=0;i<12;i++) {
			color = colors[Thruxt.rand1(colors.length)];
			size  = Thruxt.rand2(1,12);

			materials[i] = new THREE.PointCloudMaterial( { size: size, sizeAttenuation: false, map:sprite, transparent: true } );

			materials[i].color = new THREE.Color(color[0], color[1], color[2]);

			particles = new THREE.PointCloud( geometry, materials[i] );

			particles.rotation.x = Math.random() * 6;
			particles.rotation.y = Math.random() * 6;
			particles.rotation.z = Math.random() * 6;

			self.scene.add( particles );
		}

	}

	var make = function(scene,x,y,z,density){
		return new StarField(scene,x,y,z,density);
	};

	return make;

})();