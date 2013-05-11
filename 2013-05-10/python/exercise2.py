#Generate the 2D profile curves of the car envelope in the three coordinate directions,
#embed them in 3D (in the x=0, y=0 and z=0 planes, respectively, with the reference frame
#origin set approximately at the car centroid) and mount them together in a "two-and-a-half-dimensional"
#(2.5D) or "pseudo-3D" model.

from pyplasm import *
import scipy
from scipy import *

# AUXILIARY FUNCTIONS---------------------------------------------------------
def VERTEXTRUDE((V,coords)):
    """
        Utility function to generate the output model vertices in a 
        multiple extrusion of a LAR model.
        V is a list of d-vertices (each given as a list of d coordinates).
        coords is a list of absolute translation parameters to be applied to 
        V in order to generate the output vertices.
        
        Return a new list of (d+1)-vertices.
    """
    return CAT(AA(COMP([AA(AR),DISTR]))(DISTL([V,coords])))

def cumsum(iterable):
    # cumulative addition: list(cumsum(range(4))) => [0, 1, 3, 6]
    iterable = iter(iterable)
    s = iterable.next()
    yield s
    for c in iterable:
        s = s + c
        yield s

def larExtrude(model,pattern):
    V,FV = model
    d = len(FV[0])
    offset = len(V)
    m = len(pattern)
    outcells = []
    for cell in FV:
        # create the indices of vertices in the cell "tube"
        tube = [v + k*offset for k in range(m+1) for v in cell]
        # take groups of d+1 elements, via shifting by one
        rangelimit = len(tube)-d
        cellTube = [tube[k:k+d+1] for k in range(rangelimit)]
        outcells += [scipy.reshape(cellTube,newshape=(m,d,d+1)).tolist()]
    outcells = AA(CAT)(TRANS(outcells))
    outcells = [group for k,group in enumerate(outcells) if pattern[k]>0 ]
    coords = list(cumsum([0]+(AA(ABS)(pattern))))
    outVerts = VERTEXTRUDE((V,coords))
    newModel = outVerts, CAT(outcells)
    return newModel

def GRID(args):
    model = ([[]],[[0]])
    for k,steps in enumerate(args):
        model = larExtrude(model,steps*[1])
    V,cells = model
    verts = AA(list)(scipy.array(V) / AA(float)(args))
    return MKPOL([verts, AA(AA(lambda h:h+1))(cells), None])
#------------------------------------------------------------#

#START exercise2#

domain = GRID([20,20])

# PROFILE SIDE where z = 0
# Side profile blueprint of the car

def profile_side():

	#control points (look blueprint_code.jpeg in images directory)

	#front
	sp0 = [[0,1.4,0],[0.12,1.1,0],[0.12,0.6,0],[0,0.3,0]]

	#bottom
	sp1 = [[0,0.3,0],[0.3,-0.1,0],[1,0,0],[1.8,0,0]]
	sp3 = [[3.8,0,0],[9,0,0]]

	#front wheel
	sp2 = [[1.8,0,0],[1.6,0.7,0],[2,1.5,0],[2.4,2,0],[3.3,1.8,0],[3.7,1.6,0],[3.8,0,0]]

	#rear wheel
	#copy sp2 and traslate it

	# top
	sp4 = [[0,1.4,0],[1,2,0],[2,2.4,0],[2.8,2.6,0],[3,2.65,0],[4,2.6,0]]
	sp5 = [[4,2.6,0],[4.3,2.7,0],[4.6,2.9,0],[4.9,3.1,0],[5.2,3.2,0],[5.8, 3.4, 0]]
	sp6 = [[5.8,3.4,0],[6.5,3.47,0],[7,3.55,0], [7.5,3.5,0],[8.1,3.45,0]]
	sp7 = [[8.1,3.45,0],[8.5,3.4,0], [9, 3.3, 0], [9.5, 3.2,0], [10.1, 3, 0]]
	sp8 = [[10.1,3,0],[10.5,2.95,0],[11,2.9,0],[11.5,2.85,0], [11.7, 2.9, 0]]
	sp9 = [[11.7, 2.9, 0],[11.6,2.8,0],[11.8,2,0], [12.1, 1.2, 0], [11.8, 0.5, 0]]
	sp10 = [[11,0,0],[11.8,0.5,0]]

	#POLYMARKERS (used for testing)
	smp0 = POLYMARKER(1)(sp0)
	smp1 = POLYMARKER(1)(sp1)
	smp2 = POLYMARKER(1)(sp2)
	smp3 = POLYMARKER(1)(sp3)
	smp4 = POLYMARKER(1)(sp4)
	smp5 = POLYMARKER(1)(sp5)
	smp6 = POLYMARKER(1)(sp6)
	smp7 = POLYMARKER(1)(sp7)
	smp8 = POLYMARKER(1)(sp8)
	smp9 = POLYMARKER(1)(sp9)
	smp10 = POLYMARKER(1)(sp10)

	#BEZIER CURVES
	sb0 = BEZIER(S1)(sp0)
	sb1 = BEZIER(S1)(sp1)
	sb2 = BEZIER(S1)(sp2)
	sb3 = BEZIER(S1)(sp3)
	sb4 = BEZIER(S1)(sp4)
	sb5 = BEZIER(S1)(sp5)
	sb6 = BEZIER(S1)(sp6)
	sb7 = BEZIER(S1)(sp7)
	sb8 = BEZIER(S1)(sp8)
	sb9 = BEZIER(S1)(sp9)
	sb10 = BEZIER(S1)(sp10)

	# MAPPING
	sc0 = MAP(sb0)(domain)
	sc1 = MAP(sb1)(domain)
	sc2 = MAP(sb2)(domain)
	sc2t = T(1)(9-1.8)(sc2)
	sc3 = MAP(sb3)(domain)
	sc4 = MAP(sb4)(domain)
	sc5 = MAP(sb5)(domain)
	sc6 = MAP(sb6)(domain)
	sc7 = MAP(sb7)(domain)
	sc8 = MAP(sb8)(domain)
	sc9 = MAP(sb9)(domain)
	sc10 = MAP(sb10)(domain)

	side = STRUCT([sc0, sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9, sc10, sc2t])
	return side

profileSide = profile_side()
#VIEW(profileSide)

#FRONT SIDE where x = 0
# Front profile blueprint of the car

def profile_front():

	#control points (look blueprint_code.jpeg in images directory)

	fp0 = [[0,0.3,0],[0,-0.1,0.3],[0,0.1,1.57],[0,0,2.1],[0,0,2.64]]
	fp1 = [[0,0.3,0],[0,1.4,0.2],[0,1.39,0.51],[0,1.42,0.61]]
	fp2 = [[0,1.42,0.61],[0,2.2,0.83],[0,2.6,1.07],[0,2.65,1.2]]
	fp3 = [[0,2.65,1.2], [0,2.8,1.47],[0,2.76,1.9],[0,2.9,2.3],[0,2.86,2.6]]
	
	#front window
	fp4 = [[0,1.75,0.8],[0,1.75,2.64]]
	fp5 = [[0,1.75,0.8],[0,2.15,1],[0,2.35,1.2],[0,2.55,1.4]]
	fp6 = [[0,2.55,1.4],[0,2.61,2.1],[0,2.61,2.64]]

	#light
	fp7 = [[0,1.35,0.6],[0,1.35,0.9],[0,1.26,1.1],[0,1.1,1.2],[0,1,1.2]]
	fp8 = [[0,1.35,0.6],[0,1.2,0.6],[0,1.05,0.6],[0,1,1.2]]

	#air ventilation
	fp9 = [[0,0.8,1.5],[0,0.8,1.8],[0,0.83,2.64]]
	fp10 = [[0,0.8,1.5],[0,0.3,1.6],[0,0.3,1.8], [0,0.25,2.64]]

	#POLYMARKERS (used for testing)
	fmp0 = POLYMARKER(1)(fp0)
	fmp1 = POLYMARKER(1)(fp1)
	fmp2 = POLYMARKER(1)(fp2)
	fmp3 = POLYMARKER(1)(fp3)
	fmp4 = POLYMARKER(1)(fp4)
	fmp5 = POLYMARKER(1)(fp5)
	fmp6 = POLYMARKER(1)(fp6)
	fmp7 = POLYMARKER(1)(fp7)
	fmp8 = POLYMARKER(1)(fp8)
	fmp9 = POLYMARKER(1)(fp9)
	fmp10 = POLYMARKER(1)(fp10)

	# BEZIER CURVES
	fb0 = BEZIER(S1)(fp0)
	fb1 = BEZIER(S1)(fp1)
	fb2 = BEZIER(S1)(fp2)
	fb3 = BEZIER(S1)(fp3)
	fb4 = BEZIER(S1)(fp4)
	fb5 = BEZIER(S1)(fp5)
	fb6 = BEZIER(S1)(fp6)
	fb7 = BEZIER(S1)(fp7)
	fb8 = BEZIER(S1)(fp8)
	fb9 = BEZIER(S1)(fp9)
	fb10 = BEZIER(S1)(fp10)

	# MAPPING
	fc0 = MAP(fb0)(domain)
	fc1 = MAP(fb1)(domain)
	fc2 = MAP(fb2)(domain)
	fc3 = MAP(fb3)(domain)
	fc4 = MAP(fb4)(domain)
	fc5 = MAP(fb5)(domain)
	fc6 = MAP(fb6)(domain)
	fc7 = MAP(fb7)(domain)
	fc8 = MAP(fb8)(domain)
	fc9 = MAP(fb9)(domain)
	fc10 = MAP(fb10)(domain)

	# Rotated duplicate
	light = T([2,3])([-0.1,0.2])(STRUCT([fc7,fc8]))
	frontTrack = STRUCT([fc4,fc5,fc6,fc9,fc10,light])
	dup = STRUCT([fc0,fc1,fc2,fc3,frontTrack])
	dupR = R([1,3])(PI)(dup)
	dupRT = T([3])([5.2])(dupR)

	front = STRUCT([dup,dupRT])

	return front


profileFront = profile_front()
#VIEW(profileFront)

#FRONT SIDE where y = 0
# Bottom profile blueprint of the car

def profile_bottom():

	#control points (look blueprint_code.jpeg in images directory)

	bp0 = [[0.3,0,0.2],[0.1,0,2.60],[0,0,2.64],[0.1,0,2.60],[0.3,0,2.64*2-0.2]]
	bp1 = [[0.3,0,0.2],[0.4,0,0],[10,0,0],[11,0,0.2]]
	bp2 = [[11,0,2.64*2-0.2],[10,0,2.64*2],[0.4,0,2.64*2],[0.3,0,2.64*2-0.2]]
	bp3 = [[11,0,2.64*2-0.2], [11.7,0,2.6],[11.8,0,2.64],[11.7,0,2.6],[11,0,0.2]]

	#POLYMARKERS (used for testing)
	bmp0 = POLYMARKER(1)(bp0)
	bmp1 = POLYMARKER(1)(bp1)
	bmp2 = POLYMARKER(1)(bp2)
	bmp3 = POLYMARKER(1)(bp3)

	# BEZIER CURVES
	bb0 = BEZIER(S1)(bp0)
	bb1 = BEZIER(S1)(bp1)
	bb2 = BEZIER(S1)(bp2)
	bb3 = BEZIER(S1)(bp3)

	# MAPPING
	bc0 = MAP(bb0)(domain)
	bc1 = MAP(bb1)(domain)
	bc2 = MAP(bb2)(domain)
	bc3 = MAP(bb3)(domain)

	bottom = STRUCT([bc0, bc1, bc2, bc3])

	return bottom

profileBottom = profile_bottom()
#VIEW(profileBottom)

# MODEL
model = STRUCT([profileSide, profileFront, T(3)(2.64*2)(profileSide), profileBottom])
centeredModel = T([1,2,3])([-5.9, -1.4, -2.64])(model)
VIEW(centeredModel)

#END exercise2#