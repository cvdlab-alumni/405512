/*
exercise03

exercise03a

write a function that given a word return it capitalized

exercise03b

write a function that capitalize each word of the following text:
"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
*/

function exercise03a(word){
	var firstChar = word.charAt(0).toUpperCase();
	return firstChar + word.slice(1);
}

var wordTest = "loLok";
console.log(wordTest);
var wordCapitalized = exercise03a(wordTest);
console.log(wordCapitalized);

function exercise03b(text){
	var result = text.split(' ').map(exercise03a);
	result = result.join(' ');
	return result;
}

var testo = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
var eachWordCapitalized = exercise03b(testo);
console.log(eachWordCapitalized);