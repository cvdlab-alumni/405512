/*
Exercise 4
Build near the edge of the mountainous area a model (in appropriate scale) of a human settlement, randomly assembling several parallel rectangular buildings (of varying heights and sizes).
The settlement must be produced in local coordinates in function of some parameters, and then placed on the scene in at least two different instances, as produced by different
generator parameters.

The student is free to select any number and meaning of the generator parameters.
*/

/*	Previous Exercises	*/

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

/*	Exercise 3 start	*/

var colorTrunk = [139/255, 69/255, 19/255];
var colorForestGreen = [34/255, 139/255, 34/255];

var cylinder = function(radius, height, quality) {
	var disk = DISK(radius)([quality, 2]);
	var result = EXTRUDE([height])(disk);;
	return result;
};

var forestGenerator = function(treeQuantity, coneRadius){
	var treeDomain = PROD1x1([INTERVALS(1)(10),INTERVALS(1)(6)]);
	var apex = [0,0,coneRadius];
	var c1 = BEZIER(S0)([[-coneRadius,0,0],[-coneRadius,coneRadius,0],[0,coneRadius,0],[coneRadius,coneRadius,0],[coneRadius,0,0]]);
	var trunk = COLOR(colorTrunk)(cylinder(0.025,0.2,12));
	var cone = COLOR(colorForestGreen)(T([0,1,2])([0,0,0.198])(MAP(CONICAL_SURFACE(apex)(c1))(treeDomain)));
	var tree = STRUCT([trunk, cone, R([0,1])([PI])(cone)]);

	for (var i = 0; i<=treeQuantity; i++){
		approved = 0;
		while (approved===0){
  				treeXpos = Math.random()*btXdim;
  				treeYpos = Math.random()*btYdim;
  				//	Checks that tree is not positioned on top of a lake
  				if ((treeXpos<xLakeRandom || treeXpos>xLakeRandom+xLakeDim)&&(treeYpos<yLakeRandom || treeYpos>yLakeRandom+yLakeDim)&&(treeYpos>0.7)){
  					approved = 1;
  				};
  		};
		var treePositioned = T([0,1,2])([treeXpos, treeYpos, 0])(tree);
		DRAW(treePositioned);
	};
};

var model = STRUCT([base, terrain, lake]);
forestGenerator(200,0.1);

/*	Exercise 4	*/

var colorBeige = [245/255, 245/255, 220/255];

var buildSettlement = function(location){
	var xStartingPointSettlement = location[0];
	var yStartingPointSettlement = location[1];
	var xSettlementRandom = Math.random()/6;
	var ySettlementRandom = Math.random()/6;
	var xSettlementRandom2 = Math.random()/6;
	var ySettlementRandom2 = Math.random()/6;
	var xSettlementRandom3 = Math.random()/6;
	var ySettlementRandom3 = Math.random()/6;
	var houses1stRow = T([0,1,2])([xStartingPointSettlement, yStartingPointSettlement, 0])(SIMPLEX_GRID([[xSettlementRandom, -0.1, 0.1, -xSettlementRandom, xSettlementRandom*2], [ySettlementRandom], [0.18]]));
	var houses2ndRow = T([0,1,2])([xStartingPointSettlement, yStartingPointSettlement, 0])(SIMPLEX_GRID([[xSettlementRandom*2 + xSettlementRandom2, -xSettlementRandom2, xSettlementRandom2, -0.1, 0.1 ], [-ySettlementRandom*2, ySettlementRandom2], [0.23]]));
	var houses3rdRow = T([0,1,2])([xStartingPointSettlement, yStartingPointSettlement, 0])(SIMPLEX_GRID([[0.1, -0.1, xSettlementRandom3, -xSettlementRandom3, xSettlementRandom3*2 ], [-ySettlementRandom*2 - ySettlementRandom2*2, ySettlementRandom3], [0.13]]));
	var settlement = COLOR(colorBeige)(STRUCT([houses1stRow, houses2ndRow, houses3rdRow]));
	DRAW(settlement);
};

DRAW(model);
buildSettlement([0,0]); // First settlement located at origin (0,0)
buildSettlement([2*PI,0]); // Second settlement