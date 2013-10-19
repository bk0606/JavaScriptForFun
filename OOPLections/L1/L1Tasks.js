'use strict';
window.onload = function () {
	
    // Task №1
    var equation = new Polinome([0, 12, 4]);
    console.log("Task №1: " + equation.getPolinom());

    // Task №2
    var Albert = new Person("Albert", "06.06.92");
    console.log("Task №2: " + Albert.getPersonInfo());

    // Task №3
    var polinome = new Polinome([0, 12, 4, 312, 42]);
    console.log("Task №3: " + polinome.getPolinom());

    // Task №4
	var fract = new Fraction();
    fract.addFract(7, 3);
    fract.addFract(7, 8);
    console.log("Task №4: " + fract.getFract());

};

// Task №1
var Person = function(_name, _DOB) {
    var name = _name;
    var DOB  = _DOB;

    this.getPersonInfo = function () {
        return "Person " + name + " was born in " + DOB;
    }
};

// Task №1, 3
var Polinome = function(_coefArray) {
    var polynomial = function(coefArray) {
        var strPolinom = "";
        for (var i = 0; i < coefArray.length; i++) {
            if(coefArray[i] !== 0)
                strPolinom += coefArray[i] + "*X" + i + "^" + i + " ";
        };
        return strPolinom;
    }(_coefArray);

    this.getPolinom = function() {
        return polynomial;
    };
};

// Task №4
var Fraction = function() {
    var fractArray = [];

    this.reduse = function(numer, denomin) {
        if (Math.floor(numer / denomin) === 0) 
            return numer  + "/" + denomin;
        else
            return Math.floor(numer / denomin) + "+" + (numer % denomin) + "/" + denomin;
    };

    this.addFract = function(numer, denomin) {
        fractArray.push(this.reduse(numer, denomin));
    }
    this.getFract = function(index) {
        if (!!index || index === 0)
            return fractArray[index];
        else 
            return fractArray;
    };
};