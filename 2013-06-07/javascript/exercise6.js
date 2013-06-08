/*
Exercise 6
Write a function to export a LAR model, which is a pair (V, FV), where V is an array of points and FV is the compact representation of the characteristic matrix of 2D faces,
in the file format OBJ.
*/

 var lar_to_obj = function (model){
 	var result = 'Vertex array:\n';
 	var vertexArray = model[0];
 	var facesMatrix = model[1];
	var vl = vertexArray.length;

	for (var i=0; i<vl; i++){
			result += 'v[' + i + ']:\t' + vertexArray[i][0] + '\t' + vertexArray[i][1] + '\n';
	};

	result += 'Faces matrix:\n';

	for(var i=0; i<vl; i++){
		var fl = facesMatrix[i].length;
		for(var j=0; j<fl; j++){
			var lastElement = fl-1;
			switch(j){
				case(0):
					result += 'f[' + i + ']:\t' + facesMatrix[i][j] + '\t'; break;
				case(lastElement):
					result += facesMatrix[i][j] + '\n'; break;
				default:
					result += facesMatrix[i][j] + '\t'; break;
			};
 		};
	};
	return result;
};

//	Example

v = [[0,6],
 	[0,0],
 	[3,0],
 	[6,0],
 	[0,3],
 	[3,3],
 	[6,3],
 	[6,6],
 	[3,6]];

fv = [[5,6,7,8],
	 [0,5,8],
	 [0,4,5],
	 [1,2,4,5],
	 [2,3,5,6],
	 [0,8,7],
	 [3,6,7],
	 [1,2,3],
	 [0,1,4]];

model = [v,fv];
console.log(lar_to_obj(model));