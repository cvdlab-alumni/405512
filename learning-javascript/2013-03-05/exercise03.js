/* 
write a script exercise03.js that prints in console the following identity matrix, then commit it and push it:

 1,  0,  0,  0,  0,  0,  0,  0,  0,  0
 0,  1,  0,  0,  0,  0,  0,  0,  0,  0
 0,  0,  1,  0,  0,  0,  0,  0,  0,  0
 0,  0,  0,  1,  0,  0,  0,  0,  0,  0
 0,  0,  0,  0,  1,  0,  0,  0,  0,  0
 0,  0,  0,  0,  0,  1,  0,  0,  0,  0
 0,  0,  0,  0,  0,  0,  1,  0,  0,  0
 0,  0,  0,  0,  0,  0,  0,  1,  0,  0
 0,  0,  0,  0,  0,  0,  0,  0,  1,  0
 0,  0,  0,  0,  0,  0,  0,  0,  0,  1

 */

 var dimensioneMatrix = 10;
 var matrix = "";

 for (i = 1; i <= dimensioneMatrix; i++){
 	for (j = 1; j <= dimensioneMatrix; j++){
 		if (i===dimensioneMatrix && j===dimensioneMatrix){ 
 			matrix += 1;
 		} else if (j===dimensioneMatrix){
 			matrix += 0;
 		} else if (i===j) {
 			matrix += 1 + ',\t';
 		}
 		else {
 			matrix += 0 + ',\t';
 		}
 	}
 	matrix += '\n';
 }

 console.log(matrix);