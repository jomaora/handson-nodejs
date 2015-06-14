'use strict'

var Circle = require('./module/circle');
var Square = require('./module/square');

console.log(Circle.area(3));

var s1 = new Square(5);
console.log(s1.area());