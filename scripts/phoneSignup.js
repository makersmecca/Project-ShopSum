import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Declarations and initializations
// Firebase Console -> Project Overview-> Project Settings -> General -> Your App -> Config
const firebaseConfig = {
    apiKey: "api-key-goes-here",
    authDomain: "app-domain-name",
    projectId: "app-id",
    storageBucket: "app-link.com",
    messagingSenderId: "sender-id",
    appId: "app-id"
};

const app = initializeApp(firebaseConfig);
const auth = new getAuth(app);

const req = document.getElementById("otpRequest");
const phNumber = document.getElementById("phoneNumber");
const dispName = document.getElementById("username");

const code = document.getElementById("verificationcode");
const otpbtn = document.getElementById("verify");

const otpStat = document.getElementById("otp-status");
const errorMsg = document.getElementById("errormsg");

auth.useDeviceLanguage();

var phoneNum = "+91"; //variable to add contry code to entered phone number

window.addEventListener("keydown", e => {
    if (e.code === 'Enter') {
        document.getElementById("errormsg").innerHTML = "";
        e.preventDefault();
        otpbtn.click();
    }
})

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    'size': 'normal',
    'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("solved");
        if (phNumber.value != null) req.removeAttribute("disabled");
        else (alert("Enter valid phone number to continue"));
        // ...
    },
    'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        console.log("timed out");
        alert("Recaptcha has expired, Please try again");
        // ...
    }
});
recaptchaVerifier.render()
    .then(widgetID => {
        window.recaptchaWidgetID = widgetID;
    }).catch(error => {
        //console.log(error);

    })

req.addEventListener("click", (e) => {
    if (phNumber.value != "") {
        phoneNum = phoneNum.concat(phNumber.value);
        // console.log(phoneNum);
        // console.log(typeof (phNumber.value));
        signInWithPhoneNumber(auth, phoneNum, (window.recaptchaVerifier))
            .then((confirmationResult) => {
                //otp sent
                window.confirmationResult = confirmationResult;
                //console.log(confirmationResult);
                //console.log("OTP Sent");
                otpStat.innerHTML = "OTP Sent Successfully";
                otpStat.classList.add("valid");
                otpStat.classList.remove("invalid");
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // console.log("OTP not sent");
                console.log(error);
                otpStat.innerHTML = "Could not send OTP. Please try again";
                otpStat.classList.add("invalid");
                otpStat.classList.remove("valid");
                // ...
            });
    }
})



otpbtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("errormsg").innerHTML = "";
    if (code.value != "" && code.value.length === 6) {
        //console.log(code.value.length);
        confirmationResult.confirm(code.value).then((result) => {
            const user = result.user;
            //console.log(code.value);
            console.log("verification successful");
            otpbtn.innerHTML = "Signing In..";
            document.getElementById("loader").classList.remove("d-none");
            errorMsg.innerHTML = "OTP Verified successfully";
            errorMsg.classList.add("valid");
            errorMsg.classList.remove("invalid");
            document.getElementById("existingUser").classList.add("d-none");
            updateProfile(auth.currentUser, {
                displayName: dispName.value
            }).then(() => {
                window.open("calculator.html", "_parent");
            }).catch((error) => {

            });
            //console.log(user);
        }).catch((error) => {
            console.log(error);
            console.log("verification failed");
            errorMsg.innerHTML = "OTP could not be verified, Please try again";
            errorMsg.classList.add("invalid");
            errorMsg.classList.remove("valid");
        });
    }
    else {
        errorMsg.innerHTML = "Please enter a valid OTP.";
        errorMsg.classList.add("invalid");
        errorMsg.classList.remove("valid");
    }
})





