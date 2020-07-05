let display = document.getElementById('display');

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
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'){
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
            } else if (previousKeyType === 'operator' || previousKeyType === 'calculate'){
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

              calculator.dataset.firstValue = calcValue   // Update calculated value as firstValue

            } else {
              calculator.dataset.firstValue = displayedNum // If there are no calculations, set displayedNum as the firstValue
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

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum // Make current displayed no. the end calc for continuous calc to work
                    secondValue = calculator.dataset.modValue // Allows calc to occur if second value exists
                }

                display.textContent = calculate(firstValue, operator, secondValue) // pPevent calc when op keys not yet clicked
            }
            calculator.dataset.modValue = secondValue // Custom attribute added to include 2nd value during continuous calc
            calculator.dataset.previousKeyType = 'calculate'
        }
        
        if (action === 'clear'){
            display.innerHTML = "0";
        }
    }
})

