'use strict';
window.onload = function () {
	var straightA = new Straight(new Point(6, 8, 2), new Point(16, 6, 24));
	var straightB = new Straight(new Point(3, 4, 1), new Point(8, 3, 12));
	var triangle = new Triangle([straightA, straightB]);
	console.log("Длинна 1 вектора: " + straightA.getLength());
	console.log("Длинна 2 вектора: " + straightB.getLength());
	console.log("Координаты трёхугольника: " + triangle.getCoords());
};

var Point = function(iX, iY, iZ) {
	this.iX = iX;
	this.iY = iY;
	this.iZ = iZ;

	this.getCoords = function() {
		return "("+iX+", "+iY+", "+iZ+")";
	};
};

// iX, iY, iZ - coords of direction vector
var Straight = function(pointA, pointB) {
	var pntA = pointA;
	var pntB = pointB;
	this.iX = Math.abs(pointB.iX - pointA.iX);
	this.iY = Math.abs(pointB.iY - pointA.iY);
	this.iZ = Math.abs(pointB.iZ - pointA.iZ);

	this.getLength = function() {
		return Math.sqrt((this.iX)^2 + (this.iY)^2 + (this.iZ)^2);
	};
	this.getCoords = function() {
		return "["+pntA.getCoords()+", "+pntB.getCoords()+"]";
	};
};

/**
*	VolumeObject - base class for create 3D figures, 
*	with array of parallel figures & object whitch 
*	can check the parallelism. 
*/
var VolumeObject = function(figuresArray, checkerObject) {
	var arFigures = null;
	var checkStraight = function() {
		try{
			// Check for parallel & decrease
			for (var i = 0; i < figuresArray.length-1; i++) {
				checkerObject.check(figuresArray[i], figuresArray[i+1]);
			}
			arFigures = figuresArray;
		}
		catch(error) {
			console.log("Error name: " + error.name + "Error message: " + error.message);
		}
	} ();
	this.getCoords = function() {
		var coords = "<";
		for (var i = 0; i < arFigures.length; i++) {
			coords += arFigures[i].getCoords();
			coords += (i === arFigures.length-1) ? ">" : ", ";
		}
		return coords;
	};
};

/**
*	TriangleChecker - checkerObject for 
* 	VolumeObject to check the triangle
* 	parallelism.
*/
var TriangleChecker = function() {
	this.check = function(straightA, straightB) {
		if(straightA && straightB){
			if((straightA.getLength() > straightB.getLength()) && 
				((straightA.iX / straightB.iX) === (straightA.iY / straightB.iY)) && 
				((straightA.iY / straightB.iY) === (straightA.iZ / straightB.iZ))) 
					return true;
		}
		throw new Error("Некорректно заданы координаты");
	}
};
/**
*	Triangle - creater of concrete triangle
*/
var Triangle = function(straightArray) {
	if(straightArray)
		var TrnglObj = new VolumeObject(straightArray, new TriangleChecker());
	else 
		throw new Error("Некорректно заданы координаты");

	this.getCoords = function() {
		return TrnglObj.getCoords();
	};
}


var Tetrahedron = function() {
	// Аналогично Triangle, влом писать checker... :`(
};

