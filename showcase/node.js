!(function (exports){

  var fs = require('fs');

  var plasm_lib = require('plasm.js');
  var obj = plasm_lib.plasm;
  var fun = plasm_lib.plasm_fun;
  var plasm = obj.plasm;
  var Plasm = obj.Plasm;

  var root = this;

  Object.keys(fun).forEach(function (k) { 
    root[k] = fun[k];
  });

  var p = new Plasm();
  fun.PLASM(p);


  var scmodel = (function () {
  /*///////////////////////////////////////////

  /*
    LEGO
    @Author: Eder Monaco
  */

  //  AUXILIARY VARIABLES AND FUNCTIONS

  var blackColor = [0/255,0/255,0/255];
  var greenColor = [0/255,255/255,0/255];
  var blueColor = [0/255,191/255,255/255];
  var yellowColor = [255/255,255/255,0/255];
  var redColor = [255/255,0/255,0/255];

  var cylinder = function(radius, height, quality) {
    var disk = DISK(radius)([quality, 2]);
    var result = EXTRUDE([height])(disk);;
    return result;
  };

  //  BASE

  function createBase(width, depth, color) {
    var cuboid = CUBOID([1,1,1]);
    var cylinderTop = cylinder(0.25, 0.25, 20);
    var baseUnit = STRUCT([cuboid, T([0,1,2])([0.5,1,0.5])(R([1,2])(-PI/2)(cylinderTop))]);
    var baseRow = STRUCT(REPLICA(width)([baseUnit, T([0])([1])]));
    //result
    var base = COLOR(color)(STRUCT(REPLICA(depth)([baseRow, T([2])([1])])));
    return base;
  };

  //  LOWER BODY CHARACTER

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
  };

  //  UPPER BODY CHARACTER

  function createUpperBodyCharacter(color){
    //body
    var domain = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);
    var c0 = BEZIER(S0)([[0,0,0],[2,0,0]]);
    var c1 = BEZIER(S0)([[0.3,1.6,0.2],[1.7,1.6,0.2]]);
    var bodyBackBezier = MAP(BEZIER(S1)([c0,c1]))(domain);
    var bodyBack = T([0,1,2])([0,3.1,0])(bodyBackBezier);
    var bodyFront = T([0,1,2])([2,0,1])(R([0,2])(PI)(bodyBack));
    var c2 = BEZIER(S0)([[0,0,0],[0,0,1]]);
    var c3 = BEZIER(S0)([[0.3,1.6,0.2],[0.3,1.6,0.8]]);
    var bodyRightBezier = MAP(BEZIER(S1)([c2,c3]))(domain);
    var bodyRight = T([0,1,2])([0,3.1,0])(bodyRightBezier);
    var bodyLeft = T([0,1,2])([2,0,1])(R([0,2])(PI)(bodyRight));
    var c4 = BEZIER(S0)([[0.3,0,0.2],[1.7,0,0.2]]);
    var c5 = BEZIER(S0)([[0.3,0,0.8],[1.7,0,0.8]]);
    var bodyTopBezier = MAP(BEZIER(S1)([c4,c5]))(domain);
    var bodyTop = T([0,1,2])([0,4.7,0])(bodyTopBezier);
    //arms
    var domain2D = DOMAIN([[0,1],[0,1]])([40,40]);
    var profile_armRight1 = BEZIER(S0)([[0.3, 4.45, 0.7], [-0.3, 4.45, 0.7], [-0.3, 3.5, 0.7], [-0.2, 3.5, 1.2]]);
    var profile_armRight2 = BEZIER(S0)([[0.3, 4.45, 0.3], [-0.3, 4.45, 0.3], [-0.3, 3, 0.2], [-0.2, 3.2, 1.2]]);
    var profile_armRight12UP = BEZIER(S0)([[0.3, 4.7, 0.45], [-0.5, 4.7, 0.45], [-0.5, 3.35, 0.45], [-0.4, 3.35, 1.2]]);
    var profile_armRight12DOWN = BEZIER(S0)([[0.3, 3.8, 0.45], [0.3, 3.8, 0.45], [0.3, 3.4, 0.45], [0.25, 3.35, 1.2]]);
    var armRightSurface1 = MAP(BEZIER(S1)([profile_armRight1, profile_armRight12UP, profile_armRight2]))(domain2D);
    var armRightSurface2 = MAP(BEZIER(S1)([profile_armRight1, profile_armRight12DOWN, profile_armRight2]))(domain2D);
    var armRight = STRUCT([armRightSurface1, armRightSurface2]);
    var profile_armLeft1 = BEZIER(S0)([[-0.3, 4.45, 0.7], [0.3, 4.45, 0.7], [0.3, 3.5, 0.7], [0.2, 3.5, 1.2]]);
    var profile_armLeft2 = BEZIER(S0)([[-0.3, 4.45, 0.3], [0.3, 4.45, 0.3], [0.3, 3, 0.2], [0.2, 3.2, 1.2]]);
    var profile_armLeft12UP = BEZIER(S0)([[-0.3, 4.7, 0.45], [0.5, 4.7, 0.45], [0.5, 3.35, 0.45], [0.4, 3.35, 1.2]]);
    var profile_armLeft12DOWN = BEZIER(S0)([[-0.3, 3.8, 0.45], [-0.3, 3.8, 0.45], [-0.3, 3.4, 0.45], [-0.25, 3.35, 1.2]]);
    var armLeftSurface1 = MAP(BEZIER(S1)([profile_armLeft1, profile_armLeft12UP, profile_armLeft2]))(domain2D);
    var armLeftSurface2 = MAP(BEZIER(S1)([profile_armLeft1, profile_armLeft12DOWN, profile_armLeft2]))(domain2D);
    var armLeft = T([0,1,2])([2,0,0])(STRUCT([armLeftSurface1, armLeftSurface2]));
    
    //result
    var upperBody = COLOR(color)(STRUCT([bodyBack, bodyFront, bodyRight, bodyLeft, bodyTop, armRight, armLeft]));
    return upperBody;
  };

  //  HANDS

  function createHands(color){
    //wrists
    var wristRight = T([0,1,2])([-0.155,3.35,1.1])(cylinder(0.12, 0.2, 20));
    var wristLeft = T([0,1,2])([2.155,3.35,1.1])(cylinder(0.12, 0.2, 20));
    //hand
    var domain2D = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(20)]);
    var ncpVector = [0,0,0.4];
    var handPoints = BEZIER(S0)([[0.22,0.22,0],[-0.22,0.22,0],[-0.22,-0.22,0],[0.22,-0.22,0]]);
    var handRight = T([0,1,2])([-0.15,3.55,1.41])(R([0,2])(-PI/2)(R([1,2])(PI/2)(MAP(CYLINDRICAL_SURFACE(handPoints)(ncpVector))(domain2D))));
    var handLeft = T([0,1,2])([2.3,0,0])(handRight);

    //result
    var hands = COLOR(color)(STRUCT([wristRight, wristLeft, handRight, handLeft]));
    return hands;
  };

  //  HEAD

  function createHead(color){
    //neck
    var neck = T([0,1,2])([1,4.7,0.5])(R([1,2])(-PI/2)(cylinder(0.3, 1.49, 20)));
    //head
    var domainFace = DOMAIN([[0,1],[0,2*PI]])([30,50]);
    var c0 = BEZIER(S0)([[0, 0, 0.6],[0.05, 0, 0.6], [0.65, 0, 0.6], [0.65, 0, 0.6], [0.65, 0, 0]]);
    var mapping = ROTATIONAL_SURFACE(c0);
    var faceSurfaceUP = MAP(mapping)(domainFace);
    var faceSurfaceDOWN = R([1,2])(PI)(faceSurfaceUP);
    var faceSurface = T([0,1,2])([1,5.4,0.5])(R([1,2])(-PI/2)(STRUCT([faceSurfaceDOWN, faceSurfaceUP])));
    //result
    var head = COLOR(color)(STRUCT([neck, faceSurface]));
    return head;
  };

  //  FACE

  function createFace(color){
    //mouth
    var domain = INTERVALS(1)(20);
    var c0 = BEZIER(S0)([[-0.2,0.2,-0.01],[0,0.07,0],[0.2,0.2,-0.01]]);
    var b0 = MAP(c0)(domain);
    var mouth = T([0,1,2])([1,5.05,1.152])(b0);
    //eyes
    var rightEye = T([0,1,2])([0.8, 5.6, 1.136])(DISK(0.06)([20, 2]));
    var leftEye = T([0,1,2])([0.4,0,0])(rightEye);
    var eyes = STRUCT([rightEye, leftEye, mouth]);
    //result
    var head = COLOR(color)(STRUCT([eyes]));
    return head;
  };

  //  CHARACTER

  var lowerBody = createLowerBodyCharacter(blueColor);
  var upperBody = createUpperBodyCharacter(redColor);
  var hands = createHands(yellowColor);
  var head = createHead(yellowColor);
  var face = createFace(blackColor);
  var character = STRUCT([lowerBody, upperBody, head, hands, face]);

  //  FINAL MODEL

  var base = createBase(4, 4, greenColor);
  var model = STRUCT([base, character]);

  ///////////////////////////////////////////*/
  return model
  })();

  exports.author = 'Reager-';
  exports.category = 'games';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('C:/Users/Eder/workspace/405512/showcase/data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));