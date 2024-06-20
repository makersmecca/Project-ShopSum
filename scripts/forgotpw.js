// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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
auth.useDeviceLanguage();


const emailID = document.getElementById("emailid");
const verifyBtn = document.getElementById("verifyEmail");

const errorMsg = document.getElementById("errorMsg");

function useQuery() {
    return new URLSearchParams(window.location.search);
}



verifyBtn.addEventListener("click", function () {
    sendPasswordResetEmail(auth, emailID.value)
        .then(() => {
            //console.log("verification email sent");
            errorMsg.innerHTML = "Verification email sent!";
            errorMsg.classList.add("valid");
            errorMsg.classList.remove("invalid");
            verifyBtn.setAttribute("disabled", true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/invalid-email") {
                errorMsg.innerHTML = "Invalid Email ID";
                errorMsg.classList.remove("valid");
                errorMsg.classList.add("invalid");
            }
            // console.log(errorCode);
            // console.log(errorMessage);
            // ..
        });
})

