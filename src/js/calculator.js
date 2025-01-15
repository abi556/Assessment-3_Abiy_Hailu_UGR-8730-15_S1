class Calculator {
    constructor() {
        this.currentInput = '';
        this.previousInput = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        
        this.display = document.getElementById('result');
        this.expressionDisplay = document.getElementById('expression');
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', () => this.appendNumber(button.textContent));
        });

        document.querySelectorAll('.operator').forEach(button => {
            button.addEventListener('click', () => this.setOperation(button.textContent));
        });

        document.querySelector('.equals').addEventListener('click', () => this.compute());
        document.querySelector('.clear').addEventListener('click', () => this.clear());
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentInput = '';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.currentInput.includes('.')) return;
        this.currentInput = this.currentInput.toString() + number.toString();
        this.updateDisplay();
    }

    setOperation(operator) {
        if (this.currentInput === '') return;
        if (this.previousInput !== '') {
            this.compute();
        }
        this.operation = operator;
        this.previousInput = this.currentInput;
        this.currentInput = '';
        this.updateExpressionDisplay();
    }

    updateExpressionDisplay() {
        this.expressionDisplay.value = `${this.previousInput} ${this.operation}`;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    this.clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentInput = computation;
        this.operation = undefined;
        this.previousInput = '';
        this.shouldResetScreen = true;
        this.expressionDisplay.value = '';
        this.updateDisplay();
    }

    clear() {
        this.currentInput = '';
        this.previousInput = '';
        this.operation = undefined;
        this.expressionDisplay.value = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.value = this.currentInput;
    }
}

// Initialize calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});