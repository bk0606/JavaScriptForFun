'use strict';
window.onload = function (argument) {
	console.log('Factorial of 10: ' + factorial(10));
	console.log('Fibonacci of 10: ' + findFibonacci(10));
	var intArray  = [3, 2, 5, 12, 32, 1];
	console.log("Sort of array: %s  Result: %s", intArray.toString(), qSort(intArray).toString());
}

function factorial (n) {
	return (n-1 === 0) ? n : factorial (n-1) * n;
}

function findFibonacci (number, _preview, _current) {
	if(!number) throw new Error('Incorrect input'); 
	var prev = _preview || 0;
	var curr = _current || 1;
	return number-1 === 0 ? curr : findFibonacci(number-1, curr, prev+curr);
}

function qSort (intArray) {
	if (!intArray) throw new Error('Incorrect input'); 
	var intArr = intArray;
	var lIndex = 0;
	var rIndex = intArr.length-1;

	var intenalQSort = function (intArr, lIndex, rIndex) {
		var lInd = lIndex || 0;
		var rInd = rIndex || intArr.length - 1;
		var baseInd = Math.round((rInd - lInd) / 2 + lInd);
		do {
			// On the left find el-t higher then central
			while (intArr[lInd] < intArr[baseInd]) { lInd++; }
			// On the right find el-t lower then central
			while (intArr[rInd] > intArr[baseInd]) { rInd--; }
			// Then swap it, if nececcery
		} while (lInd > rInd);
		if (lInd < rInd) {
			var tmpEl    = intArr[lInd];
			intArr[lInd] = intArr[rInd];
			intArr[rInd] = tmpEl;
			// Divide array on two parts, & call recursivly
			if (lIndex < rInd)
				intenalQSort(intArr, lIndex, rInd);
			if (lInd < rIndex) 
				intenalQSort(intArr, lInd, rIndex);
		}
		return intArr;
	}

	return intenalQSort(intArr, lIndex, rIndex);
}



	
