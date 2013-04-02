/* 
exercise01

write a script exercise01.js containing a function identity(n)
that returns the n rows by n columns identity matrix
*/

function identity(n){
	var matrix = "";
	for (i=0; i<n; i++){
		for (j=0; j<n; j++){
			if (i===j){
				matrix += 1 + '\t';
			} else{
				matrix += 0 + '\t';
			}
		}
		matrix += '\n';
	}

	return matrix;
}

console.log(identity(9));
console.log(identity(1));
console.log(identity(4));