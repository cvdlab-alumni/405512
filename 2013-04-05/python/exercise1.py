#Exercise 1
#Define, with names pillars0, pillars1, pillars2, and pillars3, the models of pillars of the 4 house floors, and put them into the STRUCT of an initial building model.

from pyplasm import *

GRID = COMP([INSR(PROD),AA(QUOTE)]); # GRID is an auxiliary function

foundations = GRID([[122.5],[67],[5]]); # 122.5 x 67

# Variables
pillarLength = 2.5;
round_pillarRadius = pillarLength/2.0;
pillarHeight = 23;
round_pillar = CYLINDER([round_pillarRadius, pillarHeight])(60);

# Pillars floor0
square_pillars0 = GRID([[-18.75, pillarLength, -11.25, pillarLength, -25, pillarLength, -25, pillarLength, -32.5], [-47.5, pillarLength, -17], [-7, pillarHeight]]);
round_pillars0_firstRow = STRUCT(NN(5)([(T([1, 2, 3])([5 + round_pillarRadius, 5 + round_pillarRadius, 7])(round_pillar)), T([1])([pillarLength + 25])]));
round_pillars0_secondRow = STRUCT(NN(2)([(T([1, 2, 3])([5 + round_pillarRadius, 47.5 + round_pillarRadius, 7])(round_pillar)), T([1])([pillarLength + 107.5])]));
round_pillars0 = STRUCT([round_pillars0_firstRow, round_pillars0_secondRow]);
pillars0 = STRUCT([square_pillars0, round_pillars0]);

# Pillars floor1
square_pillars1 = GRID([[-5, pillarLength, -25, pillarLength, -25, pillarLength, -50 - pillarLength, pillarLength, -5], [-5, pillarLength, -40, pillarLength, -17], [-7 - pillarHeight - 1, pillarHeight]]);
square_pillar = GRID([[-87.5, pillarLength, -32.5], [-5, pillarLength, -40 - pillarLength - 17], [-7 - pillarHeight - 1, pillarHeight]]);
round_pillars1 = T([1, 2, 3])([87.5 + round_pillarRadius, 47.5 + round_pillarRadius, 7 + pillarHeight + 1])(round_pillar);
pillars1 = STRUCT([square_pillars1, square_pillar, round_pillars1]);

# Pillars floor2
pillars2_firstRow = GRID([[-5, pillarLength, -25, pillarLength, -80, pillarLength, -5], [-5, pillarLength, -40 - pillarLength - 17], [-7 - 2*pillarHeight - 2, pillarHeight]]);
pillars2_secondRow = GRID([[-5, pillarLength, -25, pillarLength, -25, pillarLength, -25, pillarLength, -25, pillarLength, -5], [-47.5, pillarLength, - 17], [-7 - 2*pillarHeight - 2, pillarHeight]]);
pillars2_fill = GRID([[-5, pillarLength, -25, pillarLength, -80 - pillarLength - 5], [-5, pillarLength, -40, pillarLength, -17], [-7 - 2*pillarHeight, 2]]); # there is no floor surface here, the pillars here continure from floor1
pillars2 = STRUCT([pillars2_firstRow, pillars2_secondRow, pillars2_fill]);

# Pillars floor3
pillars3_firstRow = GRID([[-60, pillarLength, -52.5, pillarLength, -5], [-5, pillarLength, -40 - pillarLength - 17], [-7 - 3*pillarHeight - 3, pillarHeight]]);
pillars3_secondRow = GRID([[-5, pillarLength, -25, pillarLength, -25, pillarLength, -25, pillarLength, -25, pillarLength, -5], [-47.5, pillarLength, - 17], [-7 - 3*pillarHeight - 3, pillarHeight]]);
pillars3 = STRUCT([pillars3_firstRow, pillars3_secondRow]);

# Building
building1 = STRUCT([foundations, pillars0, pillars1, pillars2, pillars3]);

# BEGIN TEST Exercise 1 (Ignore this block when copying the code for the next exercises)
exercise1 = building1
VIEW(exercise1);
# END TEST Exercise 1