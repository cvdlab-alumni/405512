/*
exercise02

write a script exercise02.js containing a function fibonacci(i)
that returns the i-th element of the Fibonacci's serie (apply memorization pattern)
*/

function fibonacci(i){
	if (!(i in fibonacci)){
		fibonacci[i] = fibonacci(i-1) + fibonacci(i-2);
	}
	return fibonacci[i];
}

fibonacci[0] = 0;
fibonacci[1] = 1;

console.log(fibonacci(2));
console.log(fibonacci(10));