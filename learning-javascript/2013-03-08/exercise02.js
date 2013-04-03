/*
exercise02

exercise02a

write a function that pushes into an array n random integer numbers

exercise02b

filter even numbers and return the odd ones

exercise02c

sort obtained numbers from the smallest to the largest
*/

function exercise02a(n){
	var array = [];
	for (i=1; i<=n; i++){
		array.push(Math.round(Math.random()*100));
	}
	return array;
}

var arrayTest = exercise02a(10);
console.log(arrayTest);

function exercise02b(array){
	var result = [];
	var filterOdd = function (item, index, array){
		return (item%2)!==0;
	}
	result = array.filter(filterOdd);
	return result;
}

var arrayFiltered = exercise02b(arrayTest);
console.log(arrayFiltered);

function exercise02c(array){
	var result = array;
	var cmpSmallToLargest = function (c1, c2){
		return c1-c2;
	}
	result.sort(cmpSmallToLargest);
	return result;
}

var arraySorted = exercise02c(arrayTest);
console.log(arraySorted);