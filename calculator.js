class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.reset();
  }

  reset() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNum(num) {
    if (num === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + num.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.total();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  total() {
    let totals;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        totals = prev + current;
        break;
      case '-':
        totals = prev - current;
        break;
      case '*':
        totals = prev * current;
        break;
      case '/':
        totals = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = totals;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(num) {
    const stringNum = num.toString();
    const integerDigits = parseFloat(stringNum.split('.')[0]);
    const decimalDigits = stringNum.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = '';
    }
  }
}

const numKeys = document.querySelectorAll('[data-number]');
const operationKeys = document.querySelectorAll('[data-operation]');
const deleteKey = document.querySelector('[data-delete]');
const resetKey = document.querySelector('[data-reset]');
const equalsKey = document.querySelector('[data-equals]');
const previousOperandText = document.querySelector('[data-previous-operation]');
const currentOperandText = document.querySelector('[data-current-operation]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numKeys.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNum(button.innerText);
    calculator.updateDisplay();
  });
});

operationKeys.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsKey.addEventListener('click', (button) => {
  calculator.total();
  calculator.updateDisplay();
});

resetKey.addEventListener('click', (button) => {
  calculator.reset();
  calculator.updateDisplay();
});

deleteKey.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
