const generateBtn = document.getElementById("generate");
const amt = document.getElementById("display");
const spchr = ["%", "*", "/", "-", "+", "="];
var userdata = " ";


function orderID(){
return ("SHP".concat(Math.floor(Math.random() * 4999 + 999)).concat("SMOID"))
}

function txID()
{
    const id = "TRNS"+(new Date().toLocaleDateString('en-US'))+"SHPSM"+(new Date().toLocaleTimeString('en-US'))+"ID";
    return(id.replace(/\s/g, "").replace(/\//g,"").replace(/\:/g,"")); //the /g removes occurrences globally from the string, without it only first instance is removed
}
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

generateBtn.addEventListener("click", function () {
    let disp = (document.getElementById("display").value).toString();
    //need to check if the display value contains a special character
    var i = 0;
    while (i < disp.length) {
        if (spchr.includes(disp.charAt(i))) {
            alert("Invalid amount. Please evaluate to continue.");
            return;
        }
        else {
            i++;
        }
    }
    //substring to include only upto two decimal places when generating payment req
    if (disp.includes(".")) { 
        // disp = disp.substring(0, (disp.indexOf(".") + 3)); 
        disp = (parseFloat(disp, 10));
        disp=roundToTwo(disp);
    }
    else{
        disp = parseFloat(disp, 10).toFixed(2);
    }

    if (disp <= 0) {
        alert("Invalid amount, minimim amount should be Rs. 1.0");
        return;
    }
    console.log(disp);
    console.log(typeof(disp));
    //console.log("generate button clicked");
    //console.log(amt.value);
    //console.log(typeof (amt.value));
    sessionStorage.setItem("amount", disp);
    sessionStorage.setItem("order_id",orderID());
    sessionStorage.setItem("payment_id",txID());
    //console.log(sessionStorage.getItem("amount"));
    //console.log(sessionStorage.getItem("order_id"));
    //console.log(sessionStorage.getItem("payment_id"));
    generateBtn.innerHTML = "Generating QR..";
    window.open("qrgenerate.html", "_parent");
})