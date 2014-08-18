var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Layer  = (function() {
	"use strict";

	var bits = 16;

	var nodeid = 1;
	var nodes  = [null];

	var max = Math.max(Thruxt.viewWidth,Thruxt.viewHeight) >> 4;
	var height = max, width = max;
	var size   = max * max * bits;

	var arybuf = new ArrayBuffer(size);
	var buffer = new Uint16Array(arybuf);

	var Node = function(object,x,y,z) {
		var self = this;
		self.object = object;
		self.x = x;
		self.y = y;
		self.z = z;
	};

	//--------------------------------------------------
	//Constructor
	var Layer = function(galaxy,z) {
		var self = this;
		self.width = width;
		self.height = height;
		self.z = z;
		self.canvas = Thruxt.makeCanvas(z);
		self.context = Thruxt.initContext(self.canvas);
		galaxy.add(self);
	};

	//--------------------------------------------------
	//Public Methods

	//Converts 2d cartesian coordinates to a buffer offset
	var offset = Layer.prototype.offset = Thruxt.offset(width);

	//Converts a buffer offset to 2d cartesian coordinates
	var points = Layer.prototype.points = Thruxt.points(width);

	//Adds a node object at the specified cartesian coordinates
	var add = Layer.prototype.add = function(object,x,y) {
		var self = this;
		nodes[nodeid] = new Node(object,x,y);
		buffer[offset(x,y)] = nodeid;
		nodeid++;
	};

	//Gets a node object at a cartesian coordinate;
	var get = Layer.prototype.get = function(x,y) {
		return nodes[buffer[offset(x,y)]];
	};

	//Moves a node object from one coordinate to another
	var move = Layer.prototype.move = function(x1,y1,x2,y2) {
		var nid1 = offset(x1,y1);
		var nid2 = offset(x2,y2);
		buffer[nid2] = buffer[nid1];
		buffer[nid1] = null;
		var n = nodes[buffer[nid2]];
		n.x = x2;
		n.y = y2;
		return n;
	};

	var render = Layer.prototype.render = function() {
		for(var i=0;i<size;i++) {
			var u = buffer[i];
			var n = u&&nodes[u];
			if (n) n.object.render(this,n);
		}
	};

	//--------------------------------------------------
	//Static Methods
	var make = Layer.make = function(z){
		return new Layer(z);
	};


	Thruxt.isLayer = function(obj) {return obj instanceof Layer};

	return Layer.make;

})();


/*

    2D ARRAY

    0  1  2  3  4 (x)
 0 [ ][ ][ ][ ][ ]
 1 [ ][ ][#][ ][ ]
 2 [ ][ ][ ][ ][ ]
 3 [ ][ ][ ][ ][ ]
 4 [ ][ ][ ][ ][ ]
(y)


                                1D BUFFER
 0  0  0  0  0  0  0  0  0  0  1  1  1  1  1  1  1  1  1  1  2  2  2  2  2
 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  (offset)
[ ][ ][ ][ ][ ][ ][ ][#][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]


ARRAY(2,1) == OFFSET(7)   ... x+y*width
OFFSET(7)  == ARRAY(2,1)  ... y=floor(off/width):1 x=width%off:2

*/