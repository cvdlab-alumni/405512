/* 
exercise01

exercise01a

write a function that pushes into an array the first n natural numbers

exercise01b

filter out odd number and return the even ones

exercise01c

double each even number obtained

exercise01d

return only numbers divisible by four

exercise01e

sum all the remaining numbers
*/

function exercise01a(n){
	var array = [];
	for (i=1; i<=n; i++){
		array.push(i);
	}
	return array;
}

var arrayTest = exercise01a(10);
console.log(arrayTest);

function exercise01b(array){
	var result;
	var filterEven = function (item, index, array){
		return (item%2)===0;
	}
	result = array.filter(filterEven);
	return result;
}

var arrayFiltered = exercise01b(arrayTest);
console.log(arrayFiltered);

function exercise01c(array){
	var result;
	var iteratorDouble = function (item, index, array){
		return item*2;
	}
	result = array.map(iteratorDouble);
	return result;
}

var arrayDoubled = exercise01c(arrayTest);
console.log(arrayDoubled);

function exercise01d(array){
	var result;
	var filterDivisible4 = function (item, index, array){
		return (item%4)===0;
	}
	result = array.filter(filterDivisible4);
	return result;
}

var arrayDivisible4 = exercise01d(arrayTest);
console.log(arrayDivisible4);

function exercise01e(array){
	var result;
	var iteratorSumAll = function (prev, current, index, array){
		return prev + current;
	}
	result = array.reduce(iteratorSumAll);
	return result;
}

var arraySummed = exercise01e(arrayTest);
console.log(arraySummed);