var buttonSelect = document.querySelectorAll('input[type=button]');
var screenEntry = document.getElementById('screen');
var ops = ['+','÷','x','-'];
var decimalAdded = false;
var evalButton = false;

window.onload = function () {
	clearScreen();
}
for (var i = 0; i < buttonSelect.length; i++) {
	buttonSelect[i].addEventListener("click", function() {
		var buttonInput = this.value;
		var equation = screenEntry.textContent;
		var lastChar = equation.charAt(equation.length - 1);
		var opsLastChar = ops.indexOf(lastChar);
 
		  // clear screen with AC button
		if (buttonInput === 'AC') {
			clearScreen();

		  // check for digits input
		} else if (/[0-9]/.test(buttonInput)) {
			addInput(buttonInput);

			// check for period input	
		} else if (buttonInput === '.' && decimalAdded === false) {
			addInput(buttonInput);
			decimalAdded = true;

			// check for operations input
			// check whether last char is an operation or decimal
		} else if (ops.indexOf(buttonInput) > -1 && opsLastChar === -1 && /\.$/.test(equation) === false) {
			// only allow minus operation at beginning of screen
			if (evalButton) {
				screenEntry.textContent = "";
				equation = screenEntry.textContent;
			}

			if (equation.length !== 0 || (equation.length === 0 && buttonInput === '-')) {
				addInput(buttonInput);
				decimalAdded = false; 					
			}
	
			// equals button will use eval() to display calculations
		} else if (buttonInput === '=') {
			// changes all x's and ÷ to readable operations for eval()
			equation = equation.replace(/x/g,'*').replace(/÷/g,'/');
			evalButton = true;
			// don't eval() if last character on screen is operation or decimal
			if (opsLastChar === -1 && /\.$/.test(equation) === false && equation.length !== 0) {
				equation = eval(equation);
				// round decimal place to 2 places
				equation = Math.round((equation + 0.00001) * 100) / 100;
				if (numDigits(equation) > 9) {
					screenEntry.textContent = "Digit Limit Met";
				} else {
					screenEntry.textContent = equation;					
				}
			}
		}
	});
}

// clear display screen
function clearScreen() {
	screenEntry.textContent = "";
	decimalAdded = false;
}

// add input from buttons
// clear previous entry if equals button was previously clicked
function addInput(buttonInput) {
	if (screenEntry.textContent === "Digit Limit Met" || evalButton) {
		clearScreen();
		evalButton = false;
	}

	// only allow max of 11 digits
	if (screenEntry.textContent.length < 9) {
		screenEntry.textContent += buttonInput;
	} else {
		screenEntry.textContent = "Digit Limit Met";
	}
}

// check the number of digits
function numDigits(x) {
	x = Number(String(x).replace(/[^0-9]/g, ''));
  return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
}