//Auxiliary functions and variables to adapt pyplasm code to plasm.js
T = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
     return object.clone().translate(dims, values);
    };
  };
};
  
R = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });
   
  return function (angle) {
    return function (object) {
      return object.clone().rotate(dims, angle);
    };
  };
};
  
S = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
      return object.clone().scale(dims, values);
    };
  };
};

S3 = S2;
S2 = S1;
S1 = S0;

GRID = SIMPLEX_GRID;

NN = REPLICA;

VIEW = DRAW;

/*
Exercise 1
Define, with names pillars0, pillars1, pillars2, and pillars3, the models of pillars of the 4 house floors, and put them into the STRUCT of an initial building model.
*/

var foundations = GRID([[122.5],[67],[5]]); // 122.5 x 67

// Variables
var pillarLength = 2.5;
var round_pillarRadius = pillarLength/2.0;
var pillarHeight = 23;
var pillarSurface = DISK(round_pillarRadius)([60, 2]);
var round_pillar = EXTRUDE([pillarHeight])(pillarSurface);;

// Pillars floor0
var square_pillars0 = GRID([[-18.75, pillarLength, -11.25, pillarLength, -25, pillarLength, -25, pillarLength, -32.5], [-47.5, pillarLength, -17], [-7, pillarHeight]]);
var round_pillars0_firstRow = STRUCT(NN(5)([(T([1, 2, 3])([5 + round_pillarRadius, 5 + round_pillarRadius, 7])(round_pillar)), T([1])([pillarLength + 25])]));
var round_pillars0_secondRow = STRUCT(NN(2)([(T([1, 2, 3])([5 + round_pillarRadius, 47.5 + round_pillarRadius, 7])(round_pillar)), T([1])([pillarLength + 107.5])]));
var round_pillars0 = STRUCT([round_pillars0_firstRow, round_pillars0_secondRow]);
var pillars0 = STRUCT([square_pillars0, round_pillars0]);

// Pillars floor1
var square_pillars1 = GRID([[-5, pillarLength, -25, pillarLength, -25, pillarLength, -50 - pillarLength, pillarLength, -5], [-5, pillarLength, -40, pillarLength, -17], [-7 - pillarHeight - 1, pillarHeight]]);
var square_pillar = GRID([[-87.5, pillarLength, -32.5], [-5, pillarLength, -40 - pillarLength - 17], [-7 - pillarHeight - 1, pillarHeight]]);
var round_pillars1 = T([1, 2, 3])([87.5 + round_pillarRadius, 47.5 + round_pillarRadius, 7 + pillarHeight + 1])(round_pillar);
var pillars1 = STRUCT([square_pillars1, square_pillar, round_pillars1]);

// Pillars floor2
var pillars2_firstRow = GRID([[-5, pillarLength, -25, pillarLength, -80, pillarLength, -5], [-5, pillarLength, -40 - pillarLength - 17], [-7 - 2*pillarHeight - 2, pillarHeight]]);
var pillars2_secondRow = GRID([[-5, pillarLength, -25, pillarLength, -25, pillarLength, -25, pillarLength, -25, pillarLength, -5], [-47.5, pillarLength, - 17], [-7 - 2*pillarHeight - 2, pillarHeight]]);
var pillars2_fill = GRID([[-5, pillarLength, -25, pillarLength, -80 - pillarLength - 5], [-5, pillarLength, -40, pillarLength, -17], [-7 - 2*pillarHeight, 2]]); // there is no floor surface here, the pillars here continure from floor1
var pillars2 = STRUCT([pillars2_firstRow, pillars2_secondRow, pillars2_fill]);

// Pillars floor3
var pillars3_firstRow = GRID([[-60, pillarLength, -52.5, pillarLength, -5], [-5, pillarLength, -40 - pillarLength - 17], [-7 - 3*pillarHeight - 3, pillarHeight]]);
var pillars3_secondRow = GRID([[-5, pillarLength, -25, pillarLength, -25, pillarLength, -25, pillarLength, -25, pillarLength, -5], [-47.5, pillarLength, - 17], [-7 - 3*pillarHeight - 3, pillarHeight]]);
var pillars3 = STRUCT([pillars3_firstRow, pillars3_secondRow]);

// Building
var building = STRUCT([foundations, pillars0, pillars1, pillars2, pillars3]);

// BEGIN TEST Exercise 1 (Ignore this block when copying the code for the next exercises)
var exercise1 = building
VIEW(exercise1);
// END TEST Exercise 1