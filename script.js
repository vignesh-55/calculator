class Calculator{
    constructor(previousDisplay, currentDisplay){
        this.previousDisplay = previousDisplay;
        this.currentDisplay = currentDisplay;
        this.clear();
    }

    clear(){
        this.current = '';
        this.previous = '';
        this.operation = undefined;
        this.displayNumber();
    }

    delete(){
        this.current = this.current.toString().slice(0, -1);
    }

    joinNumber(number){
        if(number === '.' && this.current.includes('.')) return;
        this.current = this.current.toString() + number.toString();
    }

    operationNow(operation){
        if(this.current === '') return;
        if(this.previous !== ''){
            this.evaluate();
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = '';
    }

    evaluate(){
        let result;
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        if(isNaN(curr) || isNaN(prev)) return;
        switch(this.operation){
            case '+': result = prev + curr;
            break;
            case '-': result = prev - curr;
            break;
            case '×': result = prev * curr;
            break;
            case '÷': curr === 0 ? result = "ERROR" : result = prev / curr;
            break;
            default: return;
            
        }
        this.current = result;
        this.operation = undefined;
        this.previous = '';
    }

    delimiter(number){
        const stringNum = number.toString();
        const intPart = parseFloat(stringNum.split('.')[0]);
        const decPart = stringNum.split('.')[1];
        let intDisplay;
        if(isNaN(intPart)){
            intDisplay = '';
        }else{
            intDisplay = intPart.toLocaleString('en',{
                maximumFractionDigits: 0
            })
        }
        if(decPart !== undefined){
            return `${intDisplay}.${decPart}`;
        }else{
            return intDisplay;
        }
    }

    displayNumber(){
        if(this.operation !== undefined){
            this.previousDisplay.innerText = `${this.previous} ${this.operation}`;
        }
        if(this.operation === undefined && this.previous === ''){
            this.previousDisplay.innerText = '';
        }
        // this.currentDisplay.innerText = this.delimiter(this.current);
        this.currentDisplay.innerText = this.current === '' ? 0 : this.delimiter(this.current);
    }
}

const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operator]');
const allClear = document.querySelector('[data-allClear]');
const equals = document.querySelector('[data-equals]');
const deleteKey = document.querySelector('[data-delete]');
const previousDisplay = document.querySelector('[data-previous]');
const currentDisplay = document.querySelector('[data-current]');

const calculator = new Calculator(previousDisplay,currentDisplay);

let clicked = false;
numbers.forEach(number => {
    number.addEventListener('click', () => {
        if(clicked){
            calculator.clear();
        }
        calculator.joinNumber(number.innerText);
        calculator.displayNumber();
        clicked = false;
    })
});

operations.forEach(op => {
    op.addEventListener('click', (e) => {
        console.log(op.innerText)
        calculator.operationNow(op.innerText);
        calculator.displayNumber();
    })
});

equals.addEventListener('click', eq => {
    calculator.evaluate();
    calculator.displayNumber();
    clicked = true;
})

allClear.addEventListener('click', () => {
    calculator.clear();
    calculator.displayNumber();
});

deleteKey.addEventListener('click', () => {
    calculator.delete();
    calculator.displayNumber();
});