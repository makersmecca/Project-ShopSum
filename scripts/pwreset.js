// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset, applyActionCode } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

const pw = document.getElementById("password");
const rstpw = document.getElementById("confirmPassword");
const signup = document.getElementById("updatepw");
const signin = document.getElementById("continuebtn");

function useQuery() {
    return new URLSearchParams(window.location.search);
}

const query = useQuery();
const mode = query.get('mode');
const actionCode = query.get('oobCode');
const continueUrl = query.get('continueUrl');

const verify = document.getElementById("emailverify");
const resetCont = document.getElementById("passreset");
const continueSignin = document.getElementById("continuesignin");

const viewBtn1 = document.getElementById("bvwpw1");
const vis1 = document.getElementById("visible1");
const invis1 = document.getElementById("invisible1");

const viewBtn2 = document.getElementById("bvwpw2");
const vis2 = document.getElementById("visible2");
const invis2 = document.getElementById("invisible2");

viewBtn1.addEventListener("click", () => {
    if (vis1.classList.contains("d-none")) {
        vis1.classList.remove("d-none");
        invis1.classList.add("d-none");
        pw.type = "text";
    }
    else {
        vis1.classList.add("d-none");
        invis1.classList.remove("d-none");
        pw.type = "password";
    }

})

viewBtn2.addEventListener("click", () => {
    if (vis2.classList.contains("d-none")) {
        vis2.classList.remove("d-none");
        invis2.classList.add("d-none");
        rstpw.type = "text";
    }
    else {
        vis2.classList.add("d-none");
        invis2.classList.remove("d-none");
        rstpw.type = "password";
    }

})


if (mode === "verifyEmail") {
    applyActionCode(auth, actionCode)
        .then((resp) => {
            //console.log(resp);
            verify.classList.remove("d-none");
            // resetCont.classList.add("d-none");
            continueSignin.classList.remove("invisible");
        })
        .catch((error) => {
            console.log(error);
        })
}
//else{    //uncomment to test the below logic
else if (mode === "resetPassword") {   //comment to test the below logic

    resetCont.classList.remove("d-none");
    verifyPasswordResetCode(auth, actionCode).then((email) => {
        document.getElementById("userEmail").innerHTML = "Password Reset for the user ".concat(email);
        //console.log(email);
    })

    //password validation start
    const updateRequirement = (id, valid) => {
        const requirement = document.getElementById(id);
        if (valid) {
            requirement.classList.remove("d-none");
        } else {
            requirement.classList.add("d-none");
        }
    };
    pw.addEventListener("input", (event) => {
        const value = event.target.value;

        updateRequirement('con0', value.length >= 8)
        updateRequirement('con1', /[a-z]/.test(value))
        updateRequirement('con2', /[A-Z]/.test(value))
        updateRequirement('con3', /\d/.test(value))
        updateRequirement('con4', /[#.?!@$%^&*-]/.test(value))
    });

    rstpw.addEventListener("blur", function () {
        let pass = document.getElementById("password").value;
        let confirmed = document.getElementById("confirmPassword").value;
        if (
            pass.length >= 8 &&
            /[a-z]/.test(pass) &&
            /[A-Z]/.test(pass) &&
            /\d/.test(pass) &&
            /[#.?!@$%^&*-]/.test(pass) &&
            pass == confirmed
        ) {
            signup.removeAttribute("disabled");
            document.getElementById("errormsg").innerHTML = "Password is Valid";
        }
        else {
            signup.setAttribute("disabled", true);
            if (pass != confirmed) document.getElementById("errormsg").innerHTML = "Error: Passwords do not match";
            else document.getElementById("errormsg").innerHTML = "";
        }
    })
    //password validation end



    signup.addEventListener("click", function () {
        confirmPasswordReset(auth, actionCode, rstpw.value).then((resp) => {
            //console.log(resp);
            signin.classList.remove("invisible");
            signup.innerHTML = "Update Success!";
            signup.setAttribute("disabled", true);
        })


    })

}
else { //comment this block when testing the JS
    document.querySelector("body").classList.add("d-none");
    window.open("index.html", "_parent");
}