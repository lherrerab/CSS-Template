var digits = ['0','1','2','3','4','5','6','7','8','9','.'];
var operators = ['+','-','x','÷'];
var buttons = document.querySelectorAll('.button');
var display = document.querySelector('.display');
var numberExtra;
var flagOperation = false;
var operation;
var flagDecimal = false;

for(i=0; i<buttons.length; i++) {
  buttons[i].addEventListener('click', buttonPressed);
}

function buttonPressed(event) {
  var value = event.target.value;
  if(digits.includes(value)) {
    inNumber(value);
  }
  else if(operators.includes(value)) {
    flagOperation = true;
    flagDecimal = false;
    operation = value;
    numberExtra = parseFloat(display.value);
  }
  else if(value === '±') {
    changeSign();
  }
  else if(value === '=') {
    showResult();
  }
  else if(value === '←') {
    removeDigit();
  }
  else if(value === 'CE') {
    clearDisplay();
  }
  else if(value === 'C') {
    clearAll();
  }
}

function inNumber(number) {
  if(flagOperation) {
    clearDisplay();
    flagOperation = false;
  }
  if(display.value !== '0' && number !== '.') {
    display.value += number;
  }
  else if(number === '.' && flagDecimal === false) {
    display.value += number;
    flagDecimal = true;
  }
  else if(display.value === '0'){
    display.value = number;
  }
}

function showResult() {
  var number = parseFloat(display.value);
  switch (operation) {
    case '+':
      display.value = numberExtra + number;
      break;
    case '-':
      display.value = numberExtra - number;
      break;
    case 'x':
      display.value = numberExtra * number;
      break;
    case '÷':
      display.value = numberExtra / number;
      break;
  }
}

function changeSign() {
  display.value = -parseFloat(display.value);
}

function clearDisplay() {
  display.value = '0';
  flagDecimal = false;
}

function clearAll() {
  numberExtra = 0;
  flagOperation = false;
  operation = '';
  clearDisplay();
}

function removeDigit() {
  if(display.value in digits) {
    clearDisplay();
  }
  else if(display.value !== '0') {
    display.value = display.value.slice(0,-1);
  }
}
