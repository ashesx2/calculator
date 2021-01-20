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
        updateDisplay("DEATH");
    }
    else
    {
        quotient = num1 / num2;
    }

    return Number(quotient.toFixed(6));
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

function updateDisplay(val)
{
    if (displayVal.length >= 9) 
    {
        alert("Cannot display more values");
        return;
    }

    if (currentVal == 0)
    {
        displayVal = val;
        currentVal = val;
    }
    else
    {
        displayVal += val;
        currentVal = Number(displayVal);
    }

    let display = document.getElementById("display");
    display.innerHTML = displayVal;
}

function saveOperation()
{
    // When there is no new number and operation is changed.
    if (currentVal == 0)
    {
        operations[0] = this.id;
        return;
    }

    currentVal = 0;
    inputs.push(Number(displayVal));
    operations.push(this.id);

    if (inputs.length == 2)
    {
        let result = operate(operations[0], inputs[0], inputs[1]);
        inputs.unshift(result);
        inputs.pop(); 
        inputs.pop();
        operations.shift();
        updateDisplay(result);
        currentVal = 0;
    }

}

function clearDisplay()
{
    // When C is clicked, it clears the current screen to 0
}

function clearAll()
{
    // When AC is clicked, it clears all operations and inputs
}

let displayVal = "0";
let currentVal = 0;
let operations = [];
let inputs = [];

updateDisplay(displayVal);
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(number => number.addEventListener("click", () => updateDisplay(number.id)));

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operator => operator.addEventListener("click", saveOperation));

const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", function() {
    inputs.push(Number(displayVal))
    operate(operations[0], inputs[0], inputs[1]);
    let result = operate(operations[0], inputs[0], inputs[1]);
    inputs.unshift(result);
    inputs.pop(); 
    inputs.pop();
    operations.shift();
    currentVal = 0;
    updateDisplay(result);
    currentVal = 0;
});