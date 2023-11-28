let display = document.getElementById('display');
let currentInput = '';

function number(number) {
    currentInput += number;
    display.value = currentInput;
}

function operator(operator) {
    currentInput += operator;
    display.value = currentInput;
}

function decimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        display.value = currentInput;
    }
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function calculate() {
    try {
        currentInput = eval(currentInput);
        display.value = currentInput;
    } catch (error) {
        display.value = 'Error';
    }
}

function inputManual(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        number(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        operator(key);
    } else if (key === '.') {
        decimal();
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}
