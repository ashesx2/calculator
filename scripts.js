function add(num1, num2)
{
    return num1 + num2;
}

function subtract(num1, num2)
{
    return num1 - num2;
}

function multiply(num1, num2)
{
    return num1 * num2;
}

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

function initializeDisplay()
{
    display.innerHTML = displayVal;
    newValNext = true;
}

function updateDisplay(newDisplay)
{
    if (displayVal.length >= 9) 
    {
        alert("Cannot display more values");
        return;
    }
    
    if (newDisplay == "0" && displayVal == "0") return;

    if (newValNext)
    {
        displayVal = newDisplay;
        newValNext = false;
    }
    else
    {
        displayVal += newDisplay;
    }

    display.innerHTML = displayVal;
}

function saveOperation()
{
    if (newValNext)
    {
        operation = this.id;
        return;
    }

   inputs.push(Number(displayVal));
   newValNext = true;

   if (inputs.length == 2)
   {
       parseExpression();
   }

    operation = this.id;
}

function parseExpression() 
{
    let result = operate(operation, inputs[0], inputs[1]);
    inputs[0] = result;
    inputs.pop();

    newValNext = true;
    updateDisplay(result.toString());
    newValNext = true;
}

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

function clear()
{
    displayVal = "0";
    newValNext = true;
    initializeDisplay();
    decimalButton.disabled = false;
}

let displayVal = "0";
let newValNext = true;
let inputs = [];
let operation = "";
let display = document.getElementById("display");

initializeDisplay();

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(number => number.addEventListener("click", () => updateDisplay(number.id)));

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operator => operator.addEventListener("click", saveOperation));

const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", function() {
    if (inputs.length == 0) return;
    updateDisplay(inputs[0].toString());
    newValNext = true;
});

const clearAllButton = document.getElementById("clear-all");
clearAllButton.addEventListener("click", clearAll);

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

const decimalButton = document.getElementById("decimal");
decimalButton.disabled = false;
decimalButton.addEventListener("click", function() {
    displayVal += ".";
    newValNext = true;
    updateDisplay(displayVal);
    decimalButton.disabled = true;
});

const negationButton = document.getElementById("negation");
negationButton.addEventListener("click", function() {
    if (displayVal == "0") return;
    if (displayVal[0] == "-")
    {
        displayVal = displayVal.slice(1);
    }
    else
    {
        displayVal = "-".concat(displayVal);
    }

    newValNext = true;

    if (-(inputs[0]) == Number(displayVal))
    {
        inputs.pop();
    }

    updateDisplay(displayVal);

});

const percentButton = document.getElementById("percent");
percentButton.addEventListener("click", function() {
    let percentNum = Number(displayVal);
    percentNum /= 100;
    displayVal = (percentNum).toString();
    newValNext = true;
    updateDisplay(displayVal);
})