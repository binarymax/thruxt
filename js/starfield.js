var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Starfield = (function() {
	"use strict";

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Possible Colors for Starfield
	var colors="efffef,efffef,efffef,efffef,efffef,efffef,efffef,efffef,efffef,9db4ff,aabfff,cad8ff,fbf8ff,fff4e8,ffddb4,ffbd6f,fff4e8,ffddb4,f84235,ba3059,605170"
				.split(',')
				.map(Thruxt.hex2three);

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	//Draws a starfield
	var StarField = function(scene,x,y,z,density) {
		var self = this;
		self.scene = scene;
		self.density = density;
		self.z = z;

		self.minx = 0;
		self.miny = 0;

		self.maxx = 0;
		self.maxy = 0;

		self.starsprite = THREE.ImageUtils.loadTexture('/textures/circle-white-24.png');

		self.draw(x,y,density);

	};


	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Draws a field of density stars at x/y/z
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
			vertex.x = x + (Math.random() * 20000 - 5000);
			vertex.y = y + (Math.random() * 20000 - 5000);
			vertex.z = z + (Math.random() * 2000 - 1000);

			self.minx = Math.min(vertex.x,self.minx);
			self.miny = Math.min(vertex.y,self.miny);

			self.maxx = Math.max(vertex.x,self.maxx);
			self.maxy = Math.max(vertex.y,self.maxy);

			geometry.vertices.push( vertex );

		}

		for (var i=0;i<12;i++) {
			color = colors[Thruxt.rand1(colors.length)];
			size  = Thruxt.rand2(1,12);

			materials[i] = new THREE.PointCloudMaterial( { size: size, sizeAttenuation: false, map:self.starsprite, transparent: true } );

			materials[i].color = new THREE.Color(color[0], color[1], color[2]);

			particles = new THREE.PointCloud( geometry, materials[i] );

			particles.rotation.x = Math.random() * 6;
			particles.rotation.y = Math.random() * 6;
			particles.rotation.z = Math.random() * 6;

			self.scene.add( particles );
		}

	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Triggered when the position event is fired
	// Grows more stars if needed
	StarField.prototype.position = function(data) {
		var self = this;
		if(data.y>self.maxy) {
			self.draw(data.x,data.y,self.density);
			self.maxy = data.y+500;
		}
	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	// Returns a new starfield by calling the constructor
	var make = function(scene,x,y,z,density){
		var starfield = new StarField(scene,x,y,z,density);
		$.on("shipmove",function(e){ starfield.position(e.data); });
		return starfield;
	};

	return make;

})();