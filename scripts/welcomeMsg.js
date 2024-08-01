
const msgGenerator = ()=>{

    const indexArr = [
    "Hop In, Shop Guru!",
    "Hey There, Shopping Star!",
    "Hey, Shop-Sational Hero!",
    "Time to Rock the Shop!",
    "Welcome, Shopping Sensei!",
    "Let’s Crunch Some Numbers!",
    "Ready, Set, Shop!!!"];

    const signupArr = [
    "Get Ready to Shop ‘n’ Roll!",
    "Join the Sum Squad!",
    "Step Right In, Sum Wizard!",
    "Sum-tastic Shopping Awaits!",
    "Welcome to the Shop-o-sphere!",
    "Welcome to Your Shop Paradise!",
    "Welcome to the Sum Party!",
    "Shop ‘n Roll!",
    "Join the Shopping Revolution!"];

    if(document.getElementById("indexWlcmMsg") !=null){document.getElementById("indexWlcmMsg").innerHTML= `${indexArr[Math.floor(Math.random() * (indexArr.length))]}`
    }
    else if(document.getElementById("signUpWlcmMsg") !=null){document.getElementById("signUpWlcmMsg").innerHTML= `${signupArr[Math.floor(Math.random() * (signupArr.length))]}`
    }
}
msgGenerator();
