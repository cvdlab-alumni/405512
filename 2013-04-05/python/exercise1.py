#Exercise 1
#Define, with names pillars0, pillars1, pillars2, and pillars3, the models of pillars of the 4 house floors, and put them into the STRUCT of an initial building model.

from pyplasm import *

GRID = COMP([INSR(PROD),AA(QUOTE)]) #GRID is an auxiliary function

foundations = GRID([[122.5],[67],[5]])

square_pillars0 = GRID([[-18.75, 2.5, -11.25, 2.5, -25, 2.5, -25, 2.5, -32.5], [-47.5, 2.5, -17], [-7, 23]])

building = STRUCT([foundations, square_pillars0])
VIEW(building)