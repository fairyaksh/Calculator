let display = document.getElementById('display');

// clear button
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearFunc);
function clearFunc(e){
    if (e.target.matches('button')){
        display.innerHTML = "0";
    }
}