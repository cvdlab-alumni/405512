/*
exercise01

Write a constructor function Point2D
that create a 2D point given its x and y coordinates.
*/

function Point2D(x, y){
	this.x = x;
	this.y = y;
}

var p1 = new Point2D(0, 1);
var p2 = new Point2D(4, 1);
var p3 = new Point2D(5, 5);
var p4 = new Point2D(1, 1);

/*
exercise02a

Write a contructor function Edge
that create an edge given its two vertices (i.e. two points).

exercise02b

Write a method length for Edge
that compute the length of the edge.
*/

function Edge(v1, v2){
	this.v1 = v1;
	this.v2 = v2;
}

var e1 = new Edge(p1, p2);
var e2 = new Edge(p3, p4);
var e3 = new Edge(p1, p3);

Edge.prototype.length = function(){
	var x1 = this.v1.x;
	var y1 = this.v1.y;
	var x2 = this.v2.x;
	var y2 = this.v2.y;
	var res = Math.sqrt((Math.pow(x2-x1, 2))+(Math.pow(y2-y1, 2)));
	return res;
}

e1.length();
e2.length();
e3.length();

/*
exercise03a

Write a constructor function Triangle
that create a triangle given its three edges.

exercise03b

Write a method perimeter for Triangle
that compute the perimeter of the triangle.

exercise03b

Write a method area for Triangle
that compute the area of the triangle
(Do you remeber the Erone's formula?).
*/

function Triangle(e1, e2, e3){
	this.e1 = e1;
	this.e2 = e2;
	this.e3 = e3;
}

var tri = new Triangle(e1, e2, e3);

Triangle.prototype.perimeter = function(){
	return this.e1.length() + this.e2.length() + this.e3.length();
}

tri.perimeter();

Triangle.prototype.area = function(){
	var sp = this.perimeter()/2; //semiperimeter
	var res = Math.sqrt(sp*(sp-this.e1.length())*(sp-this.e2.length())*(sp-this.e3.length()));
	return res;
}

tri.area();