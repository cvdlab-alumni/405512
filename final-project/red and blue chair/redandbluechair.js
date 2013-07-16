/*
	Gerrit Rietveld's Red and Blue Chair
	Modeled by Eder Monaco
*/

var blackColor = [0/255,0/255,0/255];
var blueColor = [0/255,0/255,255/255];
var redColor = [255/255,0/255,0/255];
var yellowColor = [255/255,255/255,0/255];

var redAndBlueChair = function(){

	//Supporting sticks
	var supportingStickBase = COLOR(blackColor)(T([0,1,2])([0.01,0,0])(CUBOID([6.5,0.3,0.3])));
	var supportingStickBorder1 = COLOR(yellowColor)(T([0,1,2])([0,0,0])(CUBOID([0.01,0.3,0.3])));
	var supportingStickBorder2 = COLOR(yellowColor)(T([0,1,2])([6.51,0,0])(CUBOID([0.01,0.3,0.3])));
	var supportingStick = STRUCT([supportingStickBase, supportingStickBorder1, supportingStickBorder2]);

	var supportingStickFrontBase = COLOR(blackColor)(T([0,1,2])([0,0.01,0])(CUBOID([0.3,3.28,0.3])));
	var supportingStickFrontBorder1 = COLOR(yellowColor)(T([0,1,2])([0,0,0])(CUBOID([0.3,0.01,0.3])));
	var supportingStickFrontBorder2 = COLOR(yellowColor)(T([0,1,2])([0,3.29,0])(CUBOID([0.3,0.01,0.3])));
	var supportingFrontStick = STRUCT([supportingStickFrontBase, supportingStickFrontBorder1, supportingStickFrontBorder2]);

	var supportingStickBottomBase = COLOR(blackColor)(T([0,1,2])([0,0,0.01])(CUBOID([0.3,0.3,6.88])));
	var supportingStickBottomBorder1 = COLOR(yellowColor)(T([0,1,2])([0,0,0])(CUBOID([0.3,0.3,0.01])));
	var supportingStickBottomBorder2 = COLOR(yellowColor)(T([0,1,2])([0,0,6.89])(CUBOID([0.3,0.3,0.01])));
	var supportingBottomStick = STRUCT([supportingStickBottomBase, supportingStickBottomBorder1, supportingStickBottomBorder2]);

	var supportingStickMiddleBase = COLOR(blackColor)(T([0,1,2])([0,0.01,0])(CUBOID([0.3,4.58,0.3])));
	var supportingStickMiddleBorder1 = COLOR(yellowColor)(T([0,1,2])([0,0,0])(CUBOID([0.3,0.01,0.3])));
	var supportingStickMiddleBorder2 = COLOR(yellowColor)(T([0,1,2])([0,4.59,0])(CUBOID([0.3,0.01,0.3])));
	var supportingMiddleStick = STRUCT([supportingStickMiddleBase, supportingStickMiddleBorder1, supportingStickMiddleBorder2]);

	var supportingStickBackBase = COLOR(blackColor)(T([0,1,2])([0,0.01,0])(CUBOID([0.3,4.83,0.3])));
	var supportingStickBackBorder1 = COLOR(yellowColor)(T([0,1,2])([0,0,0])(CUBOID([0.3,0.01,0.3])));
	var supportingStickBackBorder2 = COLOR(yellowColor)(T([0,1,2])([0,4.84,0])(CUBOID([0.3,0.01,0.3])));
	var supportingBackStick = STRUCT([supportingStickBackBase, supportingStickBackBorder1, supportingStickBackBorder2]);

	//Armrests
	var armRestBase = COLOR(blackColor)(T([0,1,2])([0,0,0.01])(CUBOID([0.9,0.3,4.48])));
	var armRestBorder1 = COLOR(yellowColor)(T([0,1,2])([0,0,0])(CUBOID([0.9,0.3,0.01])));
	var armRestBorder2 = COLOR(yellowColor)(T([0,1,2])([0,0,4.49])(CUBOID([0.9,0.3,0.01])));
	var armRest = STRUCT([armRestBase, armRestBorder1, armRestBorder2]);

	//Seats
	var seatBase = COLOR(blueColor)(CUBOID([3.6,0.12,4.8]));
	var backSeatBase = COLOR(redColor)(CUBOID([3.3,8.8,0.12]));

	//Positioning of parts
	var supportingStick1 = T([0,1,2])([0,4.55,0])(supportingStick);
	var supportingStick2 = T([0,1,2])([0,1.15,1.8])(supportingStick);
	var supportingStick3 = T([0,1,2])([0,2.15,2.4])(supportingStick);
	var supportingStick4 = T([0,1,2])([0,1.15,6.20])(supportingStick);
	var supportingStick5 = T([0,1,2])([0,2.85,6.20])(supportingStick);
	var supportingFrontStick1 = T([0,1,2])([0.31,0,6.5])(supportingFrontStick);
	var supportingFrontStick2 = T([0,1,2])([5.91,0,6.5])(supportingFrontStick);
	var supportingBottomStick1 = T([0,1,2])([0.6,0.85,0])(supportingBottomStick);
	var supportingBottomStick2 = T([0,1,2])([5.61,0.85,0])(supportingBottomStick);
	var supportingMiddleStick1 = T([0,1,2])([0.31,0.3,2.1])(supportingMiddleStick);
	var supportingMiddleStick2 = T([0,1,2])([5.91,0.3,2.1])(supportingMiddleStick);
	var supportingBackStick1 = T([0,1,2])([0.31,0,0.3])(supportingBackStick);
	var supportingBackStick2 = T([0,1,2])([5.91,0,0.3])(supportingBackStick);
	var armRest1 = T([0,1,2])([0,4.84,-0.3])(armRest);
	var armRest2 = T([0,1,2])([5.6,4.84,-0.3])(armRest);
	var seat = T([0,1,2])([1.5,2.4,2.2])(R([1,2])([-PI/17])(seatBase));
	var backSeat = T([0,1,2])([1.685,1,2.33])(R([1,2])([-PI/6.5])(backSeatBase));

	//Model
	var model = STRUCT([supportingStick1, supportingStick2, supportingStick3, supportingStick4, supportingStick5, supportingFrontStick1, supportingFrontStick2, supportingBottomStick1, supportingBottomStick2, 
		supportingMiddleStick1, supportingMiddleStick2, supportingBackStick1, supportingBackStick2, armRest1, armRest2, seat, backSeat]);
	return model;

};

DRAW(redAndBlueChair());