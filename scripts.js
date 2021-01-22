/**
 * Returns the sum of two numbers.
 *
 * @param {number} num1 The first number input from the user.
 * @param {number} num2 The second number input from the user.
 * @return {number} The sum of num1 and num2.
 */
function add(num1, num2)
{
    return num1 + num2;
}

/**
 * Returns the difference of two numbers.
 *
 * @param {number} num1 The first number input from the user.
 * @param {number} num2 The second number input from the user.
 * @return {number} The difference of num1 and num2.
 */
function subtract(num1, num2)
{
    return num1 - num2;
}

/**
 * Returns the product of two numbers.
 *
 * @param {number} num1 The first number input from the user.
 * @param {number} num2 The second number input from the user.
 * @return {number} The product of num1 and num2.
 */
function multiply(num1, num2)
{
    return num1 * num2;
}

/**
 * Returns the quotient of two numbers. Also handles divide by zero error.
 *
 * @param {number} num1 The first number input from the user.
 * @param {number} num2 The second number input from the user.
 * @return {number} The quotient of num1 and num2.
 */
function divide(num1, num2)
{
    let quotient = 0;
    if (num2 == 0)
    {
        alert("Death.");
    }
    else
    {
        quotient = num1 / num2;
    }

    return quotient;
}

/**
 * Carries out an operation specified by argument with two numbers and returns
 * the result of the arithmetic operation.
 *
 * @param {string} operator The arithmetic operation (+, -, *, /) to perform on the numbers.
 * @param {number} num1 The first number input from the user.
 * @param {number} num2 The second number input from the user.
 * @return {number} The quotient of num1 and num2.
 */
function operate(operator, num1, num2)
{
    let result = 0;
    switch (operator)
    {
        case "add":
            result = add(num1, num2);
            break;
        case "subtract":
            result = subtract(num1, num2);
            break;
        case "multiply":
            result = multiply(num1, num2);
            break;
        case "divide":
            result = divide(num1, num2);
            break;
    }

    return result;
}

/**
 * Initializes the calculator display on start-up by displaying a default value, 0, 
 * and by preparing the entry of a new number. 
 */
function initializeDisplay()
{
    display.innerHTML = displayVal;
    newValNext = true;
}

/**
 * Changes current calculator display with a new number value that either replaces
 * the current number or is concatenated with the current number.
 *
 * @param {string} num A number to display from the number pad.
 */
function updateDisplay(num)
{   
    // Number is too long to display. Change the new display based on 
    // what kind of number it is.
    if (num.length >= 9) 
    {
        // Number is a positive value greater than -/+1. Display in exponential form.
        if (Number(num) > 1 || Number(num) < -1) 
        {
            num = parseFloat(Number(num)).toExponential(3);
        }
        // Number is a positive floating point less than -/+1. Display with fixed decimal places.
        else if (Number(num) > 0 || Number(num) < 0)
        {
            num = parseFloat(Number(num)).toFixed(7);
        }
    }

    if (num)
    // Prevent duplicate 0s when a 0 is displayed.
    if (num == "0" && displayVal == "0") return;

    // If the calculator is expecting a new value, replace existing display with new number.
    if (newValNext)
    {
        displayVal = num;
        newValNext = false;
        decimalButton.disabled = false;
    }
    else // Add to the display.
    {
        displayVal += num;
    }

    // Update display value.
    display.innerHTML = displayVal;
}

/**
 * Stores the operation to be performed and the last user input shown on the display. 
 */
function saveOperation()
{
    // Handle case in which user has not yet provided the second input before chosing
    // an operation.
    if (newValNext)
    {
        operation = this.id;
        return;
    }

    // Save the number on the display and allow user to enter a new number.
    inputs.push(Number(displayVal));
    newValNext = true;

    // If there are already at least two inputs stored, parse the expression 
    // with the last stored operation.
    if (inputs.length == 2)
    {
        parseExpression();
    }

    // Save the operation. 
    operation = this.id;
}

/**
 * Evaluates the expression: input[0] (operation) input[1].
 * The result is stored as the first number in the input array and displayed 
 * to the user.
 */
function parseExpression() 
{
    let result = operate(operation, inputs[0], inputs[1]);
    inputs[0] = result;
    inputs.pop(); // The expression evaluates to one number. 

    // Update the display with the new value and expect a new input. 
    newValNext = true;
    updateDisplay(result.toString());
    newValNext = true;
}

/**
 * Clears all saved inputs and operations and resets display to its default.
 */
function clearAll()
{
    while (inputs.length)
    {
        inputs.pop();
    }

    operation = "";
    displayVal = "0";
    newValNext = true;
    initializeDisplay();
    decimalButton.disabled = false;
}

/**
 * Clear the number displayed on the screen to its default.
 */
function clear()
{
    displayVal = "0";
    newValNext = true;
    initializeDisplay();
    decimalButton.disabled = false;
}

let displayVal = "0"; // The current value of the display.
let newValNext = true; // Determines how the next user input should be displayed.
let inputs = []; // Array of numbers holding user inputs.
let operation = ""; // Operation name specified by user input.

let display = document.getElementById("display");
initializeDisplay();

// When a number button is clicked, add the number it corresponds to on the display.
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(number => number.addEventListener("click", () => updateDisplay(number.id)));

// When an operator button is clicked, save its operation and display number.
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operator => operator.addEventListener("click", saveOperation));

// When the equals button is clicked, calculate the expression if the user provided two numbers.
const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", function() {
    if (inputs.length < 1) return;
    inputs.push(Number(displayVal));
    parseExpression();
    newValNext = true;
});

const clearAllButton = document.getElementById("clear-all");
clearAllButton.addEventListener("click", clearAll);

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

// When the decimal button is clicked, allow user to input a decimal point
// to create a floating point number. The user cannot click the button again
// until a new number is specified.
const decimalButton = document.getElementById("decimal");
decimalButton.disabled = false;
decimalButton.addEventListener("click", function() {
    newValNext = false;
    updateDisplay(".");
    decimalButton.disabled = true;
});

// Apply a sign change to the existing display number.
const negationButton = document.getElementById("negation");
negationButton.addEventListener("click", function() {
    // Ignore sign if the number is 0.
    if (displayVal == "0") return;

    // Remove or add sign at the beginning of the display.
    if (displayVal[0] == "-")
    {
        displayVal = displayVal.slice(1);
    }
    else
    {
        displayVal = "-".concat(displayVal);
    }

    newValNext = true;

    // Prevent double negative signs when the result of an operation is negated.
    if (-(inputs[0]) == Number(displayVal))
    {
        inputs.pop();
    }

    updateDisplay(displayVal);

});

// Convert the display number to its percent counterpart.
const percentButton = document.getElementById("percent");
percentButton.addEventListener("click", function() {
    let percentNum = Number(displayVal);
    percentNum /= 100;
    displayVal = (percentNum).toString();
    newValNext = true;
    updateDisplay(displayVal);
})