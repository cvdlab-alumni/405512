/*
	Gerrit Rietveld's Schroder Table
	Modeled by Eder Monaco
*/

var blackColor = [0/255,0/255,0/255];
var blueColor = [0/255,0/255,255/255];
var redColor = [255/255,0/255,0/255];
var yellowColor = [255/255,255/255,0/255];
var whiteColor = [300/255,300/255,300/255];

var cylinder = function(radius, height, quality) {
	var disk = DISK(radius)([quality, 2]);
	var result = EXTRUDE([height])(disk);;
	return result;
};

var schroderTable = function(){

	var coloringDepth = 0.003;
	var domain2D = PROD1x1([INTERVALS(1)(40),INTERVALS(1)(40)]);

	//Base disk
	var radiusBase = 3;
	var base = COLOR(whiteColor)(cylinder(radiusBase, 0.3, 256));
	var baseTop = COLOR(redColor)(cylinder(radiusBase, coloringDepth, 256));
	var baseDisk = STRUCT([R([1,2])([PI/2])(base), T([0,1,2])([0,0.003,0])(R([1,2])([PI/2])(baseTop))]);

	//Lower Section
	var lowerSectionHeight = 5.5;
	var lowerSectionLength = 3.5;
	var lowerSectionWidth = 0.4;
	var lc0 = BEZIER(S0)([[0,0,0],[lowerSectionLength,0,0]]);
	var lc1 = BEZIER(S0)([[0,lowerSectionHeight,0],[lowerSectionLength,lowerSectionHeight,0]]);
	var lowerBackBezier = MAP(BEZIER(S1)([lc0,lc1]))(domain2D);
	var lowerBack = COLOR(blackColor)(T([0,1,2])([-2.53,-0.3,-2])(lowerBackBezier));
	var lowerFront = T([0,1,2])([0,0,lowerSectionWidth])(lowerBack);
	var lc2 = BEZIER(S0)([[0,0,0],[0,0,lowerSectionWidth]]);
	var lc3 = BEZIER(S0)([[0,lowerSectionHeight,0],[0,lowerSectionHeight,lowerSectionWidth]]);
	var lowerBackFillingBezier = MAP(BEZIER(S1)([lc2,lc3]))(domain2D);
	var lowerBackFilling = COLOR(whiteColor)(T([0,1,2])([-2.53,-0.3,-2])(lowerBackFillingBezier));
	var lowerFrontFilling = T([0,1,2])([lowerSectionLength,0,0])(lowerBackFilling);
	var lc4 = BEZIER(S0)([[0,0,0],[0,0,lowerSectionWidth]]);
	var lc5 = BEZIER(S0)([[lowerSectionLength,0,0],[lowerSectionLength,0,lowerSectionWidth]]);
	var lowerBottomFillingBezier = MAP(BEZIER(S1)([lc4,lc5]))(domain2D);
	var lowerBottomFilling = COLOR(whiteColor)(T([0,1,2])([-2.53,-0.3,-2])(lowerBottomFillingBezier));
	var lowerTopFilling = T([0,1,2])([0,lowerSectionHeight,0])(lowerBottomFilling);
	var lowerSection = STRUCT([lowerBack, lowerFront, lowerBackFilling, lowerFrontFilling, lowerBottomFilling, lowerTopFilling]);

	//Middle Section
	var middleSection = T([0,1,2])([1,4,-2])(R([0,2])([PI/2])(STRUCT([COLOR(whiteColor)(lowerBack), COLOR(whiteColor)(lowerFront), COLOR(blackColor)(lowerBackFilling), COLOR(blackColor)(lowerFrontFilling), COLOR(blackColor)(lowerBottomFilling), 
		COLOR(blackColor)(lowerTopFilling)])));

	//Top Section
	var topSectionHeight = lowerSectionWidth;
	var topSectionLength = 6.8;
	var topSectionWidth = 6.8;
	var tc0 = BEZIER(S0)([[0,0,0],[2.4,0,0]]);
	var tc1 = BEZIER(S0)([[0,0,topSectionWidth],[2.4,0,topSectionWidth]]);
	var topBezier1 = MAP(BEZIER(S1)([tc0,tc1]))(domain2D);
	var square1 = T([0,1,2])([-topSectionLength/2,9.2,-topSectionLength/2])(topBezier1);
	var tc2 = BEZIER(S0)([[2.4,0,0],[2.8,0,0]]);
	var tc3 = BEZIER(S0)([[2.4,0,0.4],[2.8,0,0.4]]);
	var topBezier2 = MAP(BEZIER(S1)([tc2,tc3]))(domain2D);
	var square2 = T([0,1,2])([-topSectionLength/2,9.2,-topSectionLength/2])(topBezier2);
	var tc4 = BEZIER(S0)([[2.4,0,3.9],[2.8,0,3.9]]);
	var tc5 = BEZIER(S0)([[2.4,0,topSectionWidth],[2.8,0,topSectionWidth]]);
	var topBezier3 = MAP(BEZIER(S1)([tc4,tc5]))(domain2D);
	var square3 = T([0,1,2])([-topSectionLength/2,9.2,-topSectionLength/2])(topBezier3);
	var tc6 = BEZIER(S0)([[2.8,0,0],[6.8,0,0]]);
	var tc7 = BEZIER(S0)([[2.8,0,topSectionWidth],[6.8,0,topSectionWidth]]);
	var topBezier4 = MAP(BEZIER(S1)([tc6,tc7]))(domain2D);
	var square4 = T([0,1,2])([-topSectionLength/2,9.2,-topSectionLength/2])(topBezier4);
	var top1 = COLOR(blackColor)(STRUCT([square1, square2, square3, square4]));
	var top2 = T([0,1,2])([0,topSectionHeight,0])(top1);

	var tc2 = BEZIER(S0)([[0,0,0],[topSectionWidth,0,0]]);
	var tc3 = BEZIER(S0)([[0,topSectionHeight,0],[topSectionWidth,topSectionHeight,0]]);
	var topXFillingBezier1 = MAP(BEZIER(S1)([tc2,tc3]))(domain2D);
	var topXFilling1 = COLOR(whiteColor)(T([0,1,2])([-topSectionLength/2,9.2,-topSectionLength/2])(topXFillingBezier1));
	var topXFilling2 = T([0,1,2])([0,0,6.8])(topXFilling1);

	var tc4 = BEZIER(S0)([[0,0,0],[0,0,topSectionWidth]]);
	var tc5 = BEZIER(S0)([[0,topSectionHeight,0],[0,topSectionHeight,topSectionWidth]]);
	var topZFillingBezier1 = MAP(BEZIER(S1)([tc4,tc5]))(domain2D);
	var topZFilling1 = COLOR(whiteColor)(T([0,1,2])([-topSectionLength/2,9.2,-topSectionLength/2])(topZFillingBezier1));
	var topZFilling2 = T([0,1,2])([6.8,0,0])(topZFilling1);

	var topSection = STRUCT([top1, top2, topXFilling1, topXFilling2, topZFilling1, topZFilling2]);

	//Ornament bars
	var yellowBar = COLOR(yellowColor)(T([0,1,2])([-0.6,9.2-0.5,-2.7])(CUBOID([lowerSectionWidth+0.1,lowerSectionWidth+0.1,6.5])));
	var bbc0 = BEZIER(S0)([[0,0,0],[lowerSectionWidth,0,0]]);
	var bbc1 = BEZIER(S0)([[0,0,lowerSectionLength],[lowerSectionWidth,0,lowerSectionLength]]);
	var bbBezier1 = MAP(BEZIER(S1)([bbc0,bbc1]))(domain2D);
	var blueBar = COLOR(blueColor)(T([0,1,2])([-1,9.6,-3])(bbBezier1));

	//Model
	var model = STRUCT([baseDisk, lowerSection, middleSection, topSection, yellowBar, blueBar]);
	return model;

};

DRAW(schroderTable());