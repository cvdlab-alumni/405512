#Exercise 2
#Define plan by plan, with names floor0, floor1, floor2, floor3, and floor4, the 5 models of horizontal partitions, and add them to the STRUCT of the building model.

#Continues from Exercise 1.
# IMPORTANT: It needs the code on exercise1.py to be loaded (except the TEST part) before executing this.

# floor0
floor0 = GRID([[-5, 112.5, -5],[-5, 57, -5],[-5, 2]]);

#floor1
floor1Terrace = GRID([[5, -117.5],[-50, 10, -7],[-7 - pillarHeight, 1]]);
floor1BigBlock = GRID([[-5, 112.5, -5],[-5, 45, -10, 2, -5], [-7 - pillarHeight, 1]]);
floor1SmallBlock = GRID([[-5, 50, -12.5, 20 + pillarLength + 25 + pillarLength, -5],[-50, 10, -7], [-7 - pillarHeight, 1]]);
floor1 = STRUCT([floor1Terrace, floor1BigBlock, floor1SmallBlock]);

#floor2
floor2BigBlock = GRID([[-5 - pillarLength - 25 - pillarLength - 25, pillarLength + 25 + pillarLength + 25 + pillarLength, -5],[-5, 45, -10, 2, -5], [-7 - 2*pillarHeight - 1, 1]]);
floor2StairsBlock = GRID([[-5 - pillarLength - 25 - pillarLength - 15, 10 + pillarLength + 25 + pillarLength + 25 + pillarLength, -5],[-5 - pillarLength - 40, pillarLength + 12, -5], [-7 - 2*pillarHeight - 1, 1]]);
floor2Triangular_verts = [[0,0],[10, 0],[0, 42.5],[10, 42.5]];
floor2Triangular_cells = [[2,3,4]];
floor2Triangular_pol = MKPOL([floor2Triangular_verts, floor2Triangular_cells, None]);
floor2Triangular = T([1, 2, 3])([5+pillarLength+25+pillarLength+15, 5, 7 + 2*pillarHeight + 1])(PROD([floor2Triangular_pol, Q(1)]));
floor2 = STRUCT([floor2BigBlock, floor2StairsBlock, floor2Triangular]);

#floor3
floor3BigBlock = GRID([[-5, 112.5, -5],[-5, 45, -10, 2, -5], [-7 - 3*pillarHeight - 2, 1]]);
floor3SmallBlock = GRID([[-5, pillarLength + 25 + pillarLength + 25 + pillarLength, -25, pillarLength + 25 + pillarLength, -5],[-50, 10, -7], [-7 - 3*pillarHeight - 2, 1]]);
floor3 = STRUCT([floor3BigBlock, floor3SmallBlock]);

#floor4
floor4Sq = GRID([[-5 - pillarLength - 25 - pillarLength - 25, pillarLength + 25 + pillarLength + 25 + pillarLength, -5],[-5, pillarLength + 40, - pillarLength - 10 - 2 - 5], [-7 - 4*pillarHeight - 3, 1]]);
floor4Rect = GRID([[-5, pillarLength + 25 + pillarLength + 25 + pillarLength + 25 + pillarLength + 25 + pillarLength, -5],[-5 - pillarLength - 40, pillarLength + 10 + 2, -5], [-7 - 4*pillarHeight - 3, 1]]);
floor4 = STRUCT([floor4Sq, floor4Rect]);

# Building
building2 = STRUCT([building1, floor0, floor1, floor2, floor3, floor4]);

# BEGIN TEST Exercise 2 (Ignore this block when copying the code for the next exercises)
exercise2 = building2
VIEW(exercise2);
# END TEST Exercise 2