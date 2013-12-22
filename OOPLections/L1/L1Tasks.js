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
function Person(persName, persDOB) {
    this._name = persName;
    this._DOB  = persDOB;
}
Person.prototype.getPersonInfo = function () {
    return "Person " + this._name + " was born in " + this._DOB;
};


// Task №1, 3
function Polinome(cefficents) {
    this._cefficents = cefficents;
}

Polinome.prototype.getPolinom = function() {
    var strPolinom = "";
    for (var i = 0; i < this._cefficents.length; i++) {
        if(this._cefficents[i] !== 0)
            strPolinom += this._cefficents[i] + "*X" + i + "^" + i + " ";
    }
    return strPolinom;
};


// Task №4
function Fraction() {
    this._fractArray = [];
}
Fraction.prototype.reduse = function(numer, denomin) {
    if (Math.floor(numer / denomin) === 0)
        return numer  + "/" + denomin;
    else
        return Math.floor(numer / denomin) + "+" + (numer % denomin) + "/" + denomin;
};

Fraction.prototype.addFract = function(numer, denomin) {
    this._fractArray.push(this.reduse(numer, denomin));
};

Fraction.prototype.getFract = function(index) {
    if (!!index || index === 0)
        return this._fractArray[index];
    else
        return this._fractArray;
};