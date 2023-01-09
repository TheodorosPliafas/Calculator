// Get UI elements

let resultDisplay = document.getElementById('displayBox');
const numButton = document.querySelectorAll('.btn.num');
const opButton = document.querySelectorAll('.btn.op');
const dotButton = document.getElementById('dot-btn')
const clearButton = document.querySelector('.clear-button');
const delButton = document.querySelector('.delete-button');
const equalsButton = document.getElementById('equals');

// Variables

let defaultValue = 0;
let a = defaultValue;
let b = defaultValue;
let operator = defaultValue;
let currentNum = defaultValue;
let equalsButtonPressed = false;

//Functions 

function storeNum1(num) {
    a = num;
    currentNum = defaultValue;
    equalsButtonPressed = false;
}

function storeNum2(num) {
    b = num;
}

function addNum(a, b){
    return +a + +b;
}

function subtractNum(a, b) {
    return a - b;
}

function multiplyNum(a, b) {
    return a * b;
}

function divideNum(a, b) {
    return a / b; 
}

function storeOperator(op) {
    operator = op;
}

function operate(op, a, b) {
    let result = 0;
    switch(op) {
        case 'add': 
            result = addNum(a, b);
            break;
        case 'subtract':
            result = subtractNum(a, b);
            break;
        case 'multiply': 
            result = multiplyNum(a, b);
            break;
        case 'divide':
                result = divideNum(a, b);
                break;  
    }
    let displayResult = Math.round(result * 100000000) / 100000000;
    currentNum = displayResult;
    displayValue(currentNum);
    equalsButtonPressed = true;
}

function displayValue(value) {
    if (value.length > 10) {
        return;
    }
    resultDisplay.textContent = value;
}

function addDigit(newNum) {
    if (currentNum === defaultValue) {
         currentNum = newNum;
    } else {
        currentNum = `${currentNum}${newNum}`;
    }
    displayValue(currentNum);
    checkDot();
}

function deleteDigit() {
    currentNum = currentNum.slice(0, -1);
    if (currentNum === '') {
        displayValue(defaultValue);
    } else {
        displayValue(currentNum);
    } 
    checkDot();
}

function clearAll() {
    resultDisplay.textContent = defaultValue;
    a = defaultValue;
    b = defaultValue;
    operator = defaultValue;
    currentNum = defaultValue;
    checkDot();
}

function checkDot() {
    if (resultDisplay.textContent.includes('.')) {
        dotButton.disabled = true;
    }   else {
        dotButton.disabled = false;
    }
}

function percent() {

}

// Event listeners

numButton.forEach(num => {
    num.addEventListener('click', () => {
        let numValue = num.value;
        addDigit(numValue);
    })
});

clearButton.addEventListener('click', (e) => {
        clearAll();
});

delButton.addEventListener('click', () => {
    deleteDigit(currentNum);
});

opButton.forEach(op => {
    op.addEventListener('click', () => {
            storeOperator(op.value);
            displayValue(op.textContent);
            storeNum1(currentNum);
            return;
    })
});

dotButton.addEventListener('click', () => {
    addDigit('.');
});

equalsButton.addEventListener('click', () => {
    checkDot();
    if (operator === "divide" && b === 0) {
        resultDisplay.textContent = "Cannot divide with zero";
        return;
    }
    if (equalsButtonPressed === false) {
        storeNum2(currentNum);
        operate(operator, a, b);
    }
});