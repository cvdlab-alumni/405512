/*
	LEGO 
*/

//	AUXILIARY VARIABLES AND FUNCTIONS

var blackColor = [0/255,0/255,0/255];
var greenColor = [0/255,255/255,0/255];
var blueColor = [0/255,191/255,255/255];
var yellowColor = [255/255,255/255,0/255];
var redColor = [255/255,0/255,0/255];

var cylinder = function(radius, height, quality) {
	var disk = DISK(radius)([quality, 2]);
	var result = EXTRUDE([height])(disk);;
	return result;
}

// BASE

function createBase(width, depth, color) {
	var cuboid = CUBOID([1,1,1]);
	var cylinderTop = cylinder(0.25, 0.25, 20);
	var baseUnit = STRUCT([cuboid, T([0,1,2])([0.5,1,0.5])(R([1,2])(-PI/2)(cylinderTop))]);
	var baseRow = STRUCT(REPLICA(width)([baseUnit, T([0])([1])]));
	var base = COLOR(color)(STRUCT(REPLICA(depth)([baseRow, T([2])([1])])));
	return base;
}

// LOWER BODY CHARACTER

function createLowerBodyCharacter(color){
	//foot
	var footGridAface = SIMPLEX_GRID([[1], [0.5], [0.2]]);
	var footGridBface = R([0,2])([PI/2])(footGridAface);
	var footGridClosure = SIMPLEX_GRID([[1], [-0.4, 0.1], [1]]);
	var footRight = STRUCT([T([0,1,2])([0,1,0])(footGridAface), T([0,1,2])([0,1,1])(footGridBface), T([0,1,2])([0,1,1])(footGridAface), T([0,1,2])([0.8,1,1])(footGridBface), T([0,1,2])([0,1,0])(footGridClosure)]);
	//leg
	var legA = SIMPLEX_GRID([[1], [1.1], [0.65]]);
	var legB = R([0,2])(PI/2)(cylinder(0.5, 1, 20));
	var legRight = STRUCT([T([0,1,2])([0,1.5,0])(legA), T([0,1,2])([0,2.6,0.5])(legB), footRight]);
	var legLeft = T([0,1,2])([1,0.405,1.98])(R([1,2])(-PI/4)(legRight));
	var legs = STRUCT([legRight, legLeft]);
	//belt
	var belt = SIMPLEX_GRID([[2], [-2.95, 0.15], [1]]);
	//result
	var lowerBody = COLOR(color)(STRUCT([legs, belt]));
	return lowerBody;
}

// UPPER BODY CHARACTER

function createUpperBodyCharacter(color){
	//body
	var footGridAface = SIMPLEX_GRID([[1], [0.5], [0.2]]);
	var footGridBface = R([0,2])([PI/2])(footGridAface);
	var footGridClosure = SIMPLEX_GRID([[1], [-0.4, 0.1], [1]]);
	var footRight = STRUCT([T([0,1,2])([0,1,0])(footGridAface), T([0,1,2])([0,1,1])(footGridBface), T([0,1,2])([0,1,1])(footGridAface), T([0,1,2])([0.8,1,1])(footGridBface), T([0,1,2])([0,1,0])(footGridClosure)]);
	//arms
	var legA = SIMPLEX_GRID([[1], [1.1], [0.7]]);
	var legB = R([0,2])(PI/2)(cylinder(0.5, 1, 20));
	var legRight = STRUCT([T([0,1,2])([0,1.5,0])(legA), T([0,1,2])([0,2.6,0.5])(legB), footRight]);
	var legLeft = T([0,1,2])([1,0.405,1.98])(R([1,2])(-PI/4)(legRight));

	var upperBody = COLOR(color)(STRUCT([legRight, legLeft]));
	return upperBody;
}

// CHARACTER

var lowerBody = createLowerBodyCharacter(blueColor);
var character = STRUCT([lowerBody]);

//	FINAL MODEL

var base = createBase(4, 4, greenColor);
var model = STRUCT([base, character]);
DRAW(model) // !!! da togliere quando finito!!!!!