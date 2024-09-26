const display = document.querySelector(".display");
//const buttons = document.querySelectorAll("button");
const buttons = document.querySelectorAll(".calbtn");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
let flag = 0;
let splCount = 0;
display.value = "0";

//Function to calculate based on button clicked.
const calculate = (btnValue) => {
  //console.log(btnValue);
  //console.log(output);
  //console.log("splCount:" + splCount);
  //console.log(display.value);
  display.focus();
  if (btnValue === "=" && output !== "") {
    splCount = 0;
    output = eval(output.replace(/%/g, "/100")); //If output has '%', replace with '/100' before evaluating.
    output = output.toString(); //updates type of output variable to String
    //if output contains a decimal point then retain only upto the last two decimal places
    if (output.includes(".")) {
      output = output.substring(0, output.indexOf(".") + 3);
    }
  } else if (btnValue === "AC") {
    output = "";
    flag = 1;
    splCount = 0;
  } else if (btnValue === "DEL") {
    //remove the last character from the output.
    if (specialChars.includes(output.charAt(output.length - 1))) {
      splCount -= 1;
    }
    output = output.toString().slice(0, -1);
  } else if (btnValue === "signout") {
    output = "";
    return;
  } else {
    if (output === "" && specialChars.includes(btnValue))
      return; //If output is empty and button is specialChars then return
    //if special character button is clicked increment special character count and add special character to output
    else if (specialChars.includes(btnValue)) {
      if (specialChars.includes(output.charAt(output.length - 1))) return; //if the last character is an operator then prevent additional operators
      output += btnValue;
      splCount += 1;
    }
    //if decimal point button is clicked, ouput contains a decimal point and there are no special characters in the output then prevent adding additional decimal points
    else if (btnValue === ".") {
      if (output.includes(".") && splCount === 0) return;
      else output += btnValue; //else add decimal point to the output ex: 2.3+3.3
    } else {
      if (output.length < 11) output += btnValue;
      else {
        alert("Exceeded maximum input limit. Please evaluate to continue");
      }
    }
    //console.log(typeof (output));
  }
  if (flag === 0) {
    //console.log(typeof (output));
    output = output.toString(); //converting from number to String before pushing to the display Input field

    //console.log(typeof (output));
    display.value = output;
  } else {
    display.value = "0";
    flag = 0;
  }
};

// Add event listener to buttons, call calculate() on click
buttons.forEach((button) => {
  //Button click listener calls calculate() with dataset value as argument
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// const button = document.getElementsByClassName("calbtn");
// button.addEventListener("click", (e) => calculate(e.target.dataset.value));
