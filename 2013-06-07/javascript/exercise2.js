/*
Exercise 2
A lake can be obtained by adding a colored parallelepiped (green-water) to a digital terrain model, in such a way that the height of the parallelepiped gets higher than the altitude of the bottom-valley pattern.

A suitable lake model should be added to the mountains defined by the previous exercise.
*/

/* Previous exercises */

//	Auxiliary variables

var btXdim = 10; //base x dimension 2d
var btYdim = 10; //base y dimension 2d
var brownColor = [205/255,133/255,63/255];

//	Auxiliary functions

var x = function (u,v){
	return u;
};

var y = function (u,v){
	return v;
};

var z = function (u,v){
	var A = Math.random();
	var result = Math.pow(A*SIN(u)*SIN(v), 2);
	return result;
};

//	Curves generator

var domain = DOMAIN([[0,10],[0,10],[0,0]])([24, 24, 8]);

var mapping = function (v){
	var a = v[0];
	var b = v[1];
	var c = v[2];

	var u = a;
	var v = b;
	var w = z(u,v) + c;

	return [u,v,w];
};

//	Create terrain

var base = COLOR(brownColor)(T([0,1,2])([0,0,-0.5])(CUBOID([btXdim,btYdim,0.5])));
var terrain = COLOR(brownColor)(MAP(mapping)(domain));

//	Model

var model = STRUCT([base, terrain]);

/* End import */

/* Exercise 2 start */

var colorLake = [127/255, 255/255, 212/255, 0.9];
xLakeRandom = Math.floor(Math.random()*3)*PI/1.5;
// Control to skip 1x1 grid where settlementA will be
if(xLakeRandom===0){
	xLakeRandom = 2*PI/1.5; 
};
yLakeRandom = Math.floor(Math.random()*3)*PI/1.5;
if(yLakeRandom===0){
	yLakeRandom = 2*PI/1.5;
};
xLakeDim = 3;
yLakeDim = 3;
var lake = COLOR(colorLake)(T([0,1,2])([xLakeRandom, yLakeRandom, 0])(CUBOID([xLakeDim,yLakeDim,0.025])));
var model = STRUCT([base, terrain, lake]);
DRAW(model);