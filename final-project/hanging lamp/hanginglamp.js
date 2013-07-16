/*
	Gerrit Rietveld's Hanging Lamp
	Modeled by Eder Monaco
*/

var blackColor = [0/255,0/255,0/255];
var whiteColor = [300/255,300/255,300/255];

var cylinder = function(radius, height, quality) {
	var disk = DISK(radius)([quality, 2]);
	var result = EXTRUDE([height])(disk);;
	return result;
};

var lampCreator = function(){

	var domain = DOMAIN([[0,1],[0,2*PI]])([30,50]);
	var connector1 = COLOR(blackColor)(T([0,1,2])([-0.11,0,-0.11])(CUBOID([0.22,0.3,0.22])));
	var connector2 = COLOR(blackColor)(T([0,1,2])([-0.11,-2.8,-0.11])(CUBOID([0.2,0.3,0.2])));
	var c0 = BEZIER(S0)([[0.12, 0, 0], [0.16, 0, -0.08], [0.19, 0, -0.11], [0.19, 0, -0.13], [0.19, 0, -0.5], [0.19, 0, -1], [0.19, 0, -1.5], [0.19, 0, -2], [0.19, 0, -2.4], [0.19, 0, -2.42], [0.19, 0, -2.47], [0.16, 0, -2.47], [0.12, 0, -2.5],]);
	var mapping = ROTATIONAL_SURFACE(c0);
	var lamp = COLOR(whiteColor)(MAP(mapping)(domain));

	var model = STRUCT([connector1, connector2, R([1,2])([-PI/2])(lamp)]);
	return model;
};

var hangingLamp = function(){

	//Top base
	var base1 = COLOR(blackColor)(T([0,1,2])([0,-0.3,0])(CUBOID([4,0.3,4])));
	var base2 = COLOR(blackColor)(T([0,1,2])([-0.3,-0.5,-0.3])(CUBOID([4.6,0.2,4.6])));
	var topBase = STRUCT([base1, base2]);
	var topBaseHeight = 0.5;

	//Lines
	var radiusLine = 0.03;
	var lamp1line1 = T([0,1,2])([3,-0.001,2.5])(R([1,2])([PI/2])(COLOR(whiteColor)(cylinder(radiusLine, 8, 36))));
	var domain2D = DOMAIN([[0,1],[0,1]])([32, 64]);
	var profile1 = BEZIER(S0)([[3, -0.1, 2.525], [3, -10.6, 2.52], [3, -10.705, 2.52], [3, -10.705, 2.65], [3, -10.705, 2.9]]);
	var profile2 = BEZIER(S0)([[3, -0.1, 2.58], [3, -10.6, 2.58], [3, -10.65, 2.58], [3, -10.65, 2.65], [3, -10.65, 2.9]]);
	var profile12UP = BEZIER(S0)([[2.95, -0.1, 2.55], [2.95, -10.6, 2.55], [2.95, -10.675, 2.55], [2.95, -10.675, 2.65], [2.95, -10.675, 2.9]]);
	var profile12DOWN = BEZIER(S0)([[3.05, -0.1, 2.55], [3.05, -10.6, 2.55], [3.05, -10.675, 2.55], [3.05, -10.675, 2.65], [3.05, -10.675, 2.9]]);
	var surface1 = MAP(BEZIER(S1)([profile1, profile12UP, profile2]))(domain2D);
	var surface2 = MAP(BEZIER(S1)([profile1, profile12DOWN, profile2]))(domain2D);
	var lamp1line2 = COLOR(whiteColor)(T([0,1,2])([0.025,0.02,5.5])(R([0,2])([PI/2])(STRUCT([surface1, surface2]))));

	var lamp2line1 = T([0,1,2])([0.75,-0.001,1.5])(R([1,2])([PI/2])(COLOR(whiteColor)(cylinder(radiusLine, 9.8, 36))));
	var lamp2line2 = T([0,1,2])([3.55,-0.001,1.5])(R([1,2])([PI/2])(COLOR(whiteColor)(cylinder(radiusLine, 9.8, 36))));

	var lamp3line1 = T([0,1,2])([1.8,-0.001,0.45])(R([1,2])([PI/2])(COLOR(whiteColor)(cylinder(radiusLine, 8.8, 36))));
	var lamp3line2 = T([0,1,2])([1.8,-0.001,3.25])(R([1,2])([PI/2])(COLOR(whiteColor)(cylinder(radiusLine, 8.8, 36))));

	//Lamps
	var lamp1 = T([0,1,2])([3,-8,2.5])(lampCreator());
	var lamp2 = T([0,1,2])([3.4,-9.8,1.5])(R([0,1])([-PI/2])(lampCreator()));
	var lamp3 = T([0,1,2])([1.8,-8.8,0.6])(R([1,2])([-PI/2])(lampCreator()));

	//Model
	var model = STRUCT([topBase, lamp1, lamp2, lamp3, lamp1line1, lamp1line2, lamp2line1, lamp2line2, lamp3line1, lamp3line2]);
	return model;

};

DRAW(hangingLamp());