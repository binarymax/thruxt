var Thruxt = window.Thruxt; if(typeof Thruxt !== 'object' ) throw new Error("Thruxt not initialized!");

Thruxt.Controls = (function() {
	"use strict";

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	//Stop Event Bubblications
	var nobubble = function(e) {
		e.preventDefault();
		//e.stopPropagation();
		return false;
	}

	// =====================================================
	// desktop controls
	var desktop = function() {

		var keypress = function(e) {
			var lt = 39;
			var rt = 37;
			var up = 38;
			var dn = 40;
			var zr = 48;
			switch(e.which) {
				case lt: $.trigger("left"); nobubble(e); break;
				case rt: $.trigger("right"); nobubble(e); break;
				case up: $.trigger("forward"); nobubble(e); break;
				case dn: $.trigger("backward"); nobubble(e); break;
				case zr: $.trigger("zoomzero"); nobubble(e); break;
			}
		};

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
		var scroll = function(e) {
            var dist = 0;
            if (e.wheelDelta) {
                dist = e.wheelDelta;
            } else {
                dist = -40 * e.detail;
            }

			var event = (dist>0)?"zoomin":"zoomout";
			$.trigger(event); 
			nobubble(e);
		};

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
		var databind = function(n){
			var id   = n.getAttribute("id");
			var name = n.getAttribute("name");
			$("#"+id).on("change",function(e){
				var data   = {};
				data[name] = parseInt(n.value);
				$.trigger(id,data);
				console.log(data);
			});
		};

		//Events
		window.on("mousewheel",scroll);
		window.on("DOMMouseScroll",scroll);

		$(".control").forEach(databind);
		document.body.on("keydown",keypress);

	};

	// =====================================================
	// touchpad controls
	var touch = function() {

	};

	return {desktop:desktop,touch:touch};


})();