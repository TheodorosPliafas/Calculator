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
        case '+': 
            result = addNum(a, b);
            break;
        case '-':
            result = subtractNum(a, b);
            break;
        case '*': 
            result = multiplyNum(a, b);
            break;
        case '/':
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
    if (currentNum.length >10 ) return;
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

// Event listeners

numButton.forEach(num => {
    num.addEventListener('click', () => {
        let numValue = num.textContent;
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
            storeOperator(op.textContent);
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
    if (equalsButtonPressed === false) {
        storeNum2(currentNum);
        operate(operator, a, b);
    }
});

document.addEventListener('keydown', (event) => {
    if(event.key >= 0 && event.key <=9) {
        addDigit(event.key);
    } else if (event.key === "Delete" || event.key === "Backspace") {
        deleteDigit();
    } else if (event.key === "." && dotButton.disabled === false) {
        addDigit('.');
    } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        storeOperator(event.key);
        displayValue(operator);
        storeNum1(currentNum);
    } else if (event.key === "=") {
        if (equalsButtonPressed === false) {
            storeNum2(currentNum);
            operate(operator, a, b);
        }
        checkDot();
    } else if (event.key === "c") {
        clearAll();
    } else return;
});