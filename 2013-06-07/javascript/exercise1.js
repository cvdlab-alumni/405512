/*
Exercise 1
A digital terrain model (DTM) is normally defined as a map that associates the vertices of a simplicial decomposition of a 2D rectangle (corresponding to a geographical map) with
three coordinate functions x(u,v), y(u,v), z(u,v), where x(u,v) and y(u,v) are the selectors of the first and second coordinate of the vertices, and z(u,v) provides the height
(altitude) of vertices. This one can be obtained by adding or subtracting a (relatively small) random number to the altitude values. HINT: To provide the initial values of altitude
it is recommended to use either some mathematical function of two variables, or a surface generated from a few control points. The random correction of altitude must obviously be
executed in a second computing stage.

Produce a model of mountainous terrain using the approach described above.
*/

//	Auxiliary variables

var btXdim = 10; //base x dimension 2d
var btYdim = 10; //base y dimension 2d
var brownColor = [205/255,133/255,63/255];

//	Create terrain

var base = COLOR(brownColor)(T([0,1,2])([0,0,-2])(CUBOID([btXdim,btYdim,2])));

//	Model

var model = STRUCT([base, terrain]);
DRAW(model);