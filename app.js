const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? a / b : "Error"; // error handling for division by 0

let firstNumber = '';
let operator = '';
let secondNumber = '';

const operate = (operator, num1, num2) => {
    switch (operator) {
        case '+':
            return add(num1, num2); 
        case '-':
            return subtract(num1, num2); 
        case '*':
            return multiply(num1, num2);
        case '/':
            return num2 !== 0 ? divide(num1, num2) : "Bruh, can't divide by zero!" // error handling for division by 0
        default:
            return "Unknown operation"; // Returns an error
    }
};

const calculatorDisplay = document.getElementById('calculatorDisplay');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const clearButton = document.querySelector('[data-value="clear"]');
const equalsButton = document.querySelector('.equal-button');
const backButton = document.querySelector('[data-value="back"]');
const decimalButton = document.querySelector('[data-value="."]');

//Function to update the display
const updateDisplay = (content) => {
    calculatorDisplay.textContent = content;
};

// Adding event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (operator) {
            secondNumber += button.textContent;
        } else {
            firstNumber += button.textContent;
        }
        updateDisplay(firstNumber + operator + secondNumber);
    });
});

// Adding event listeners to operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Allow '-' to be the first character for a negative number
        if (!firstNumber && button.textContent === '-') {
            firstNumber = '-';
            updateDisplay(firstNumber);
            return;
        }

        // If the firstNumber is '-' ingnore further operator input
        if (firstNumber === '-') {
            return;
        }

        if (!firstNumber) return; // Prevent operator before a number

        if (secondNumber) {
            const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
            firstNumber = result.toString();
            secondNumber = '';
        }
        operator = button.textContent;
        updateDisplay(firstNumber + operator);
    });
});

// Equals button functionality
equalsButton.addEventListener('click', () => {
    if (!firstNumber || !operator || !secondNumber) return; // Ensure all parts of the operation are present
    const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
    updateDisplay(result);
    firstNumber = result.toString();
    operator = ''; // Reset operator to the default empty string
    secondNumber = '';
});

// AC clear button functionality
clearButton.addEventListener('click', () => {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    updateDisplay(''); // clear display
});

// Back button functionality
backButton.addEventListener('click', () => {
    if (secondNumber) {
        // If secondNumber exists, remove its last character.
        secondNumber = secondNumber.slice(0, -1);
    } else if (operator) {
        // If there's no secondNumber but an operator exists, remove the operator.
        operator = '';
    } else {
        // If neither secondNumber nor operator exists, remove the last character of firstNumber.
        firstNumber = firstNumber.slice(0, -1);
    }
    // After modifying the necessary part, update the display with the current state of the calculation.
    updateDisplay(firstNumber + operator + secondNumber);
});

//Disable multiple decimals
decimalButton.addEventListener('click', () => {
    //Checking if we're currently entering 1st or 2nd #
    if (operator) {
        // Means we're entering 2nd #
        if (!secondNumber.includes('.')) {
            secondNumber += '.';
            updateDisplay(firstNumber + operator + secondNumber);
        }
    } else {
        // We're entering 1st #
        if (!firstNumber.includes('.')) {
            firstNumber += '.';
            updateDisplay(firstNumber + operator + secondNumber);
        }
    }
});
 
// Adding keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    // Check if the key is a # or an operator and find matching button
    const button = document.querySelector(`[data-value="${key}"]`);
   // If matching button is found, simulate click on button
    if (button) {
        button.click();// Trigger a click event on the button
    }

    // Implement specific logic for keys like 'enter' for equals, 'backspace for back, etc
    if (key === 'Enter' || key === '=') {
        equalsButton.click();
    } else if (key === 'Backspace') {
        backButton.click();
    } else if (key === 'Escape') {
        clearButton.click();
    }
});