const historyDiv = document.querySelector('.history');
const currentDiv = document.querySelector('.current');

let currentValue = '';
let previousValue = '';
let operation = '';
let history = [];

function updateDisplay() {
    currentDiv.textContent = currentValue || '0';
    historyDiv.innerHTML = history
        .slice(-5)
        .map(h => `<div>${h}</div>`)
        .join('');
}

function calculate() {
    let a = parseFloat(previousValue);
    let b = parseFloat(currentValue);
    let result;

    switch (operation) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '×': result = a * b; break;
        case '÷': result = a / b; break;
        default: return;
    }

    history.push(`${a} ${operation} ${b} = ${result}`);
    currentValue = result.toString();
    previousValue = '';
    operation = '';
}

document.querySelectorAll('.number').forEach(btn => {
    btn.onclick = () => {
        currentValue += btn.textContent;
        updateDisplay();
    };
});

document.querySelectorAll('.operator').forEach(btn => {
    btn.onclick = () => {
        if (!currentValue) return;
        previousValue = currentValue;
        currentValue = '';
        operation = btn.textContent;
    };
});

document.querySelector('.equals').onclick = () => {
    if (!previousValue || !currentValue) return;
    calculate();
    updateDisplay();
};

document.querySelector('.clear').onclick = () => {
    currentValue = '';
    previousValue = '';
    operation = '';
    history = [];
    updateDisplay();
};

document.querySelectorAll('.func').forEach(btn => {
    btn.onclick = () => {
        let x = parseFloat(currentValue || 0);
        let result;

        switch (btn.textContent) {
            case 'sin': result = Math.sin(x); break;
            case 'cos': result = Math.cos(x); break;
            case 'tan': result = Math.tan(x); break;
            case '√': result = Math.sqrt(x); break;
            case 'x²': result = x * x; break;
            case 'log': result = Math.log10(x); break;
            case 'π': result = Math.PI; break;
        }

        history.push(`${btn.textContent}(${x}) = ${result}`);
        currentValue = result.toString();
        updateDisplay();
    };
});
