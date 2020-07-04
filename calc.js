let display = document.getElementById('display');

// Clear button
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearFunc);
function clearFunc(e){
    if (e.target.matches('button')){
        display.innerHTML = "0";
    }
}

// Key presses event listener
const calculator = document.querySelector('.calculator');
const keys = document.querySelector(.calc_keys);

keys.addEventListener('click', e){
    if (e.target.matches('button')){
        const key = e.target; //capturing the element that triggered the event (aka click)
        const action = key.dataset.action; //capturing the dataset attribute of this element
        const keyContent = key.textContent; //capturing the no. of the key clicked
        const displayedNum = display.textContent //capturing the currently displayed no.

        if (!action) {
            if (displayedNum === '0'){
                displayedNum = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        }
    }
}

