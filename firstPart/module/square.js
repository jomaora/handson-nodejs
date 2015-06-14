'use strict'

function Square(s) {
	this.side = s;
}; 

Square.prototype = {
	area: function () {
  		return this.side * this.side;
	},

	perimeter: function() {
  		return 4 * this.side;
	}
}	

module.exports = Square;