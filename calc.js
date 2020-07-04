let display = document.getElementById('display');

// Clear button
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearFunc);
function clearFunc(e){
    if (e.target.matches('button')){
        display.innerHTML = "0";
    }
}

// Calculator
const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calc_keys');

keys.addEventListener('click', e => {
    if (e.target.matches('button')){
        const key = e.target; //capturing the element that triggered the event (aka click)
        const action = key.dataset.action; //capturing the dataset attribute of this element
        const keyContent = key.textContent; //capturing the no. of the key clicked
        const displayedNum = display.textContent //capturing the currently displayed no.
        const previousKeyType = calculator.dataset.previousKeyType

        // key input & concatenating following inputs after first key input
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator'){
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        }

        // concatenating decimal after number input
        if (action === 'decimal'){
            display.textContent = displayedNum + ".";
        }

        // depressing op keys on click so user aware of current op
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide'){
            key.classList.add('is-depressed') //when op clicked --> new class added to op key
            calculator.dataset.previousKeyType = 'operator' // To tell if the previous key is op key --> add custom attribute
        }

        //remove new class for next no. input w/ forEach loop
        Array.from(key.parentNode.children) // 1. HTMLcollection of all key parent's child elements 
                                            // 2. String converted toArray for loop to work 
        .forEach(k => k.classList.remove('.is-depressed'));
    }
})

