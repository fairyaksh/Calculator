// clear button
const clearBtn = document.getElementById("clear");
let display = document.querySelector('calc_display');
clearBtn.addEventListener("click", clearFunc);
function clearFunc(e){
    if (e.target.matches('button')){
        display.innerHTML = "0";
    }
}