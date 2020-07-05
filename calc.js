let display = document.getElementById('display');

/* --------- Clear button --------- */
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearFunc);
function clearFunc(e){
    if (e.target.matches('button')){
        display.innerHTML = "0";
    }
}

/* --------- Calculator --------- */

// function for calculating operations

const calculate = (n1, operator, n2) => {
    let result = '';
    let first = parseFloat(n1);
    let second = parseFloat(n2);

    if (operator === 'add'){
        result = first + second
    } else if (operator === 'subtract'){
        result = first - second
    } else if (operator === 'multiply'){
        result = first * second
    } else if (operator === 'divide'){
        result = first / second
    }
    return result;
}

const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calc_keys');

keys.addEventListener('click', e => {
    if (e.target.matches('button')){
        const key = e.target; //capturing the element that triggered the event (aka click)
        const action = key.dataset.action; //capturing the dataset attribute of this element
        const keyContent = key.textContent; //capturing the no. of the key clicked
        const displayedNum = display.textContent //capturing the currently displayed no.
        const previousKeyType = calculator.dataset.previousKeyType

        // key inputs
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator'){
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number'
        }

        // concatenating decimal after number input
        if (action === 'decimal'){
            if (!displayedNum.includes('.')){         // Do nothing if decimal already included
            display.textContent = displayedNum + '.'
            } else if (previousKeyType === 'operator' || 'calculate'){
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'       
        }

        // depressing op keys on click so user aware of current op
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide'){
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
      
            if (
              firstValue &&
              operator &&
              previousKeyType !== 'operator' &&
              previousKeyType !== 'calculate'
            ) {
              const calcValue = calculate(firstValue, operator, secondValue)
              display.textContent = calcValue
              calculator.dataset.firstValue = calcValue
            } else {
              calculator.dataset.firstValue = displayedNum
            }
      
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }

        // remove new class for next no. input w/ forEach loop
        Array.from(key.parentNode.children) // 1. HTMLcollection of all key parent's child elements 
                                            // 2. String converted toArray for loop to work 
        .forEach(k => k.classList.remove('.is-depressed'));

        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum

            display.textContent = calculate(firstValue, operator, secondValue)
            calculator.dataset.previousKeyType = 'calculate'
        }
        
        if (action === 'clear'){
            calculator.dataset.previousKeyType = 'clear'
        }

 
    }
})

