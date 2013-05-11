#Generate a model of a racing car wheels (see, e.g. here), and mount four wheel instances in the 2.5D car mock-up.

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

#END exercise2#

#START exercise3#

rimSize = 0.4826; # 19 inch
tireWidth = 0.285;
tire = COLOR(BLACK)(S(3)(2)(TORUS([tireWidth*0.40 + rimSize/2.0, 2*(tireWidth*0.40 + rimSize/2.0)])([36, 72])));
rimUnderTire = COLOR(GRAY)(S(3)(2)(TORUS([rimSize/2.0, rimSize])([36, 72])));
#rimUnderTire = T(3)(-tireWidth)(PROD([CIRCUMFERENCE(tireWidth*0.40 + rimSize/2.0 - 0.000001)(36), Q(tireWidth*2)]));
rim = STRUCT([rimUnderTire]);
wheel = STRUCT([tire, rim]);
VIEW(wheel);

#testing
controlpoints=	[[[0,0,0],[0.08,-0.01,0],[0.16,-0.025,0],[0.24,-0.05,0]],
				[[0,0.05,0],[0.08,0.06,0],[0.16,0.075,0],[0.24,0.10,0]],
				[[0,0,0],[0.01,0.03,0],[0.01,0.03,0],[0,0.10,0]],
				[[0.24,-0.05,0],[0.22,0.04,0],[0.22,0.08,0],[0.24,0.10,0]]]

domain=GRID([20,20])
mapping=BEZIERSURFACE(controlpoints)
VIEW(MAP(mapping)(domain))

#END exercise3#