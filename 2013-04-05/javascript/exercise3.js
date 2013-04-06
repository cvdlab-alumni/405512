// Exercise 3
// Define, with names north, south, east, and west, the 4 models of vertical enclosures (including the hollows), and add them to the STRUCT of the building model.

//Continues from Exercise 2.
// IMPORTANT: It needs the code on exercise1.js and exercise2.js to be loaded (except the TEST parts) before executing this.

/* Nort Wall
var domSemiCircle = INTERVALS(PI)(64)
var circleFunction = CONS([COMP([COS, S1]), COMP([SIN, S1])])
var cerchio = MAP(circleFunction)(domSemiCircle)
var cerchio = S([1, 2])([11.5, 11.5])(cerchio)
var cerchio = R([1,2])([-PI/2])(cerchio);
var roundWall = T([1, 2, 3])([87.5, 62-11.5, 7])(PROD([cerchio, Q(23)]));
var northWall0 = STRUCT([roundWall]); // floor0 wall
*/

var northWall1first = GRID([[-115.5, 2, -5],[-5, 57, -5],[-7 - pillarHeight -1, pillarHeight - 22]]);
var northWall1second = GRID([[-115.5, 2, -5],[-5, pillarLength + 44, -5, 3 + pillarLength, -5],[-7 - pillarHeight -1, pillarHeight - 10]]);
var northWall1third = GRID([[-115.5, 2, -5],[-5, pillarLength + 3, -8, 1, -8, 1, -8, 1, -8, 6, -5, 3 + pillarLength, -5],[-7 - pillarHeight - 1 - 13, 10 + 1]]);
var northWall1WindowsSeparator = GRID([[-115.5, 2, -5],[-5 - pillarLength - 3 - 8 - 1 - 8 - 1 - 8 - 1 - 8 - 6, 5, -3 - pillarLength - 5],[-7 - pillarHeight - 1 - 12, 1]]);
var northWall1 = STRUCT([northWall1first, northWall1second, northWall1third, northWall1WindowsSeparator]); // floor1 wall

var northWall2first = GRID([[-115.5, 2, -5],[-5, 57, -5],[-7 - 2*pillarHeight -2, pillarHeight - 22]]);
var northWall2second = GRID([[-115.5, 2, -5],[-5, pillarLength + 44, -5, 3 + pillarLength, -5],[-7 - 2*pillarHeight - 2, pillarHeight - 10]]);
var northWall2third = GRID([[-115.5, 2, -5],[-5, pillarLength + 3, -8, 1, -8, 1, -8, 1, -8, 6, -5, 3 + pillarLength, -5],[-7 - 2*pillarHeight - 2 - 13, 10 + 1]]);
var northWall2WindowsSeparator = GRID([[-115.5, 2, -5],[-5 - pillarLength - 3 - 8 - 1 - 8 - 1 - 8 - 1 - 8 - 6, 5, -3 - pillarLength - 5],[-7 - 2*pillarHeight - 2 - 12, 1]]);
var northWall2 = STRUCT([northWall2first, northWall2second, northWall2third, northWall2WindowsSeparator]);

var northWall3first = GRID([[-115.5, 2, -5],[-5, 57, -5],[-7 - pillarHeight -1, pillarHeight - 22]]);
var northWall3second = GRID([[-115.5, 2, -5],[-5, pillarLength + 44, -5, 3 + pillarLength, -5],[-7 - 3*pillarHeight -3, pillarHeight - 10]]);
var northWall3third = GRID([[-115.5, 2, -5],[-5, pillarLength + 3, -8, 1, -8, 1, -8, 1, -8, 6, -5, 3 + pillarLength, -5],[-7 - 3*pillarHeight - 3 - 13, 10 + 1]]);
var northWall3WindowsSeparator = GRID([[-115.5, 2, -5],[-5 - pillarLength - 3 - 8 - 1 - 8 - 1 - 8 - 1 - 8 - 6, 5, -3 - pillarLength - 5],[-7 - 3*pillarHeight - 3 - 12, 1]]);
var northWall3roof = GRID([[-115.5, 2, -5],[-5, 57, -5],[-7 - 3*pillarHeight - 3 - 13 - 10 - 1, 2.5]]);
var northWall3 = STRUCT([northWall3first, northWall3second, northWall3third, northWall3WindowsSeparator, northWall3roof]);

var northWall = STRUCT([northWall1, northWall2, northWall3]);

//East Wall

//West Wall
var westWall0first = GRID([[-5, 85, -32.5],[-60, 2, -5],[-7, pillarHeight - 5]]);
var westWall0second = GRID([[-5, 57.5 + 12.5, -5, 7.5 + pillarLength, -32.5],[-60, 2, -5],[-7 - pillarHeight + 5, 5]]);
var westWall0 = STRUCT([westWall0first, westWall0second]); // floor0 wall

var westWall1first = GRID([[-5, 112.5, -5],[-60, 2, -5],[-7 - pillarHeight -1, pillarHeight/2.0 + 1]]);
var westWall1second = GRID([[-5, 42.5, -40, pillarLength + 25 + pillarLength, -5],[-60, 2, -5],[-7 - pillarHeight -1 - pillarHeight/2.0, + pillarHeight/2.0 + 1]]);
var westWall1WindowsSeparator = GRID([[-5 - 42.5 - 19, 1, -20 -pillarLength - 32.5],[-60, 2, -5],[-7 - pillarHeight - 1 - pillarHeight/2.0, + pillarHeight/2.0 + 1]]);
var westWall1Connector = GRID([[-5, 112.5, -5],[-60, 2, -5],[-7 - pillarHeight - 1 - pillarHeight, 1]]);
var westWall1 = STRUCT([westWall1first, westWall1second, westWall1WindowsSeparator, westWall1Connector]); // floor1 wall

var westWall2first = GRID([[-5, 112.5, -5],[-60, 2, -5],[-7 - 2*pillarHeight -2, pillarHeight/2.0 + 1]]);
var westWall2second = GRID([[-5, 57.5 + 25 + pillarLength + 3, -3, 5, -3, 11 + pillarLength, -5],[-60, 2, -5],[-7 - 2*pillarHeight - 2 - pillarHeight/2.0, + pillarHeight/2.0 + 1]]);
var westWall2 = STRUCT([westWall2first, westWall2second]); // floor2 wall

var westWall3 = GRID([[-5, 112.5, -5],[-60, 2, -5],[-7 - 3*pillarHeight -3, pillarHeight + 3.5]]);

var westWall = STRUCT([westWall0, westWall1, westWall2, westWall3]);
//South Wall

// Building
var building3 = STRUCT([building1, building2, northWall, westWall]);

// BEGIN TEST Exercise 3 (Ignore this block when copying the code for the next exercises)
var exercise3 = building3;
VIEW(exercise3);
// END TEST Exercise 3