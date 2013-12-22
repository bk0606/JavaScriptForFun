'use strict';
window.onload = function () {
	var sMathExpr = "((3-1)-4)+1*2";
	console.log("Входная строка: " + sMathExpr);

	console.time("Time to generate JSON: ");
	var exprJSON = parseExpression(sMathExpr); //
	console.timeEnd("Time to generate JSON: ");

	console.log("\nРаспарсенная мат. строка (JSON): ");
	console.log(JSON.stringify(exprJSON, null, 4));

	var instTree = generateObjTree(exprJSON);
	console.log("\nДерево экемпляров классов(плохо видно): ");
	console.log(instTree);
	// Don`t know how return brackets :(
	console.log("\nМетод .Show(): " + instTree.Show() + "\n\nСкобки вернулись))");

};

var IExpression = {
	Diff : function() {
		throw "Unimplemented method";
	},
	Show : function() {
		throw "Unimplemented method";
	}
};

var Variable = function(_sName) {
	var name = _sName;
	this.Diff = function() {
		return 1;
	};
	this.Show = function () {
		return name;
	};
};
Variable.prototype = IExpression;

var Number = function(_iValue) {
	var value = _iValue;
	this.Diff = function() {
		return 0;
	};
	this.Show = function () {
		return value;
	};
};
Number.prototype = IExpression;

var Add = function(_ieFirstExp, _ieSecondExp) {
	var fExp = _ieFirstExp;
	var sExp = _ieSecondExp;
	this.Diff = function() {
		return "("+fExp.Diff() + " + " + sExp.Diff()+")";
	};
	this.Show = function () {
		return "("+fExp.Show() + " + " + sExp.Show()+")";
	};
};
Add.prototype = IExpression;

var Sub = function (_ieFirstExp, _ieSecondExp) {
	var fExp = _ieFirstExp;
	var sExp = _ieSecondExp;
	this.Diff = function () {
		return "("+fExp.Diff() + " - " + sExp.Diff()+")";
	};
	this.Show = function () {
		return "("+fExp.Show() + " - " + sExp.Show()+")";
	};
};
Sub.prototype = IExpression;

var Mul = function(ieFirstExp, ieSecondExp) {
	var fExp = ieFirstExp;
	var sExp = ieSecondExp;
	this.Diff = function() {
		// Some expression
	};
	this.Show = function () {
		return "("+fExp.Show() + " * " + sExp.Show()+")";
	};
};
Mul.prototype = IExpression;

var Div = function(ieFirstExp, ieSecondExp) {
	var fExp = ieFirstExp;
	var sExp = ieSecondExp;
	this.Diff = function() {
		// Some expression
	};
	this.Show = function () {
		return "("+fExp.Show() + " / " + sExp.Show()+")";
	};
};
Div.prototype = IExpression;


/*
 *  @autor Albert Bikeev.
 *	MathExpression - class for converting mathematical sring into object (JSON three).
 *  Generate static function: parseExpression(sExpression).
 */
var MathExpression = function() {
	var sMathLine = "";
	var exprJSON  = {};
	var exprArr   = [];
	var tokensRegExp = "(\\d+_\\d+)";
	// Object of list operations with regexp & hierarchy
	var execOrder = {
		BRACKETS : {
			token: "0",
			regexp : "(?![(])(\\d+_)?\\d+[*/+\-](\\d+_)?\\d+(?=[)])"
		},
		MULTIPLICATIVE : {
			token: "1",
			regexp : "(\\d+_)?\\d+[*/](\\d+_)?\\d+"
		},
		ADDITIVE : {
			token: "2",
			regexp : "(\\d+_)?\\d+[+\-](\\d+_)?\\d+"
		}
	};

	/* Returns string in JSON format */
	var getJSONString = function(objFilter, iIdent) {
		var fo  = objFilter || null;
		var ind = iIdent || 4;
		return JSON.stringify(exprJSON, fo, ind);
	};
	var getJSONObj = function() {
		return exprJSON;
	};
	/* Remove surrounding brackets of sExpr in @sLine */
	var rmBracketsNearExpr = function(sLine, sExpr) {
		sLine = sLine.replace(new RegExp("[(](?=(" + screening(sExpr) + "))"), "");
		sLine = sLine.replace(new RegExp("(?!(" + screening(sExpr) + "))[)]"), "");
		return sLine;
	};
	/* Screening the special simbols of @sLine */
	var screening = function(sLine) {
		return sLine.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
	/* Generate exprexxion array from sMathLine by sRegexp
	 * and substitude matched expr-s by tokens */
	var getExprArray = function(sRegexp, tokenNum) {
		var rgxp = new RegExp(sRegexp, "g");
		var exprArr = new Array();
		var expr = rgxp.exec(sMathLine);
		var i = 0;
		while (expr !== null) {
			sMathLine = rmBracketsNearExpr(sMathLine, expr[0]);
			rgxp.lastIndex = 0;
			exprArr.push(expr[0]);
			sMathLine = sMathLine.replace(expr[0], tokenNum+"_"+i);
			expr = rgxp.exec(sMathLine);
			i++;
		};
		return exprArr;
	};
	/* Recurrently generates JSON object */
	var buildOperations = function(token, objContext) {
		var obj = objContext || exprJSON;
		var expression = tokenToExpr(token);
		var operation  = new RegExp("(?!((\\d+_)?\\d))[*/+\\-](?=((\\d+_)?[0-9]))").exec(expression)[0];
		var operands   = expression.split(operation);
		obj.operand1  = operands[0];
		obj.operand2  = operands[1];
		obj.operation = operation;
		// if operands[n] is token recurrently call this fun
		if(operands[0].search(tokensRegExp) !== -1) {
			obj.operand1 = {};
			buildOperations(operands[0], obj.operand1);
		}
		if(operands[1].search(tokensRegExp) !== -1) {
			obj.operand2 = {};
			buildOperations(operands[1], obj.operand2);
		}
	};
	/* Get cell from exprArray[i][j] by token: "i_j" */
	var tokenToExpr = function(token) {
		if(!token)
			return "";
		if(token.search(tokensRegExp) === -1)
			return token;
		var tokenNum = new RegExp("\\d+(?=(_\\d+))").exec(token)[0];
		var exprNum  = new RegExp("(?!(\\d+_))\\d+").exec(token)[0];
		return exprArr[tokenNum][exprNum];
	};

	window.parseExpression = function(stingMathLine) {
		try {
			sMathLine = stingMathLine || null;
			if((typeof sMathLine !== "string") || (sMathLine == null))
				throw new Error("Incorrect expression: "+sMathLine);
			if(sMathLine.search("[^0-9a-zA-Z()+\\-*/%^| ]") !== -1)
				throw new Error("Incorrect expression: "+sMathLine);
			sMathLine  = sMathLine.replace(/\s+/g, '');
			var i = 0;
			for(var key in execOrder) {
				exprArr[i] = getExprArray(execOrder[key].regexp, i);
				i++;
			}
			buildOperations(sMathLine, exprJSON);
			return exprJSON;
		}
		catch(e) {
			console.log(e);
			alert(e.message);
		}
	};
}();

var generateObjTree = function(obj){
	var inst     = {};
	var operands = [];
	var i        = 0;
	for (var key in obj) {
		if(typeof(obj[key]) == "object")
			operands[i] = generateObjTree(obj[key]);
		else {
			if(obj[key].search("[a-zA-Z]+") !== -1)
				operands[i] = new Variable(obj[key])
			else if(obj[key].search("\\d+") !== -1)
				operands[i] = new Number(obj[key]);
			else
				operands[i] = obj[key]; // operation
		}
		i++;
	}
	switch (operands[2]) {
		case "+":
			inst = new Add(operands[0], operands[1]);
			break;
		case "-":
			inst = new Sub(operands[0], operands[1]);
			break;
		case "*":
			inst = new Mul(operands[0], operands[1]);
			break;
		case "/":
			inst = new Div(operands[0], operands[1]);
			break;
	}
	return inst;
};
