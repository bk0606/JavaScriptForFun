'use strict';
window.onload = function () {
	var obj1 = {x: 2, y: new String, z: {}};
	var obj2 = {x: 2, y: "", z: {}};
	console.log("Compare objects. \nFirst obj: " + JSON.stringify(obj1) + "\nSecond obj: " + JSON.stringify(obj2));
	console.log("Recursive check: " + isEqual1(obj1, obj2));
	console.log("JSON check: " + isEqual2(obj1, obj2));
};

/** First way */
function isEqual1(objectA, objectB) {
	var compare = function (objA, objB, result) {
		var key = null;
		if (type(objA) === type(objB)) {
			if (type(objB) === "Object") {
				for (key in objA) {
					result = compare(objA[key], objB[key]);
					if (result === false) return false;
				}
				for (key in objB) {
					result = compare(objA[key], objB[key]);
					if (result === false) return false;
				}
			} else {
				return objA === objB ? true : false;
			}
		} else {
			return false;
		}
		return result;
	}
	return compare(objectA, objectB, false);
}

function type(x) {
	var allowedTypes = ["Object", "Undefined", "Null", "Boolean", "Number", "String"];
    var type = Object.prototype.toString.call(x).replace(/^\[object\s|\]$/g, '');
    return ((allowedTypes.indexOf(type) !== -1) && type) || "Object";
}

/** Second way */
function isEqual2(objectA, objectB) {
	return JSON.stringify(objectA) === JSON.stringify(objectB);
}