import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

const email = document.getElementById("defaultsignin");
const confpw = document.getElementById("confirmPassword");
const password = document.getElementById("password");
const submit = document.getElementById("signup");

const errorMsg = document.getElementById("errormsg");

const viewBtn1 = document.getElementById("bvwpw1");
const vis1 = document.getElementById("visible1");
const invis1 = document.getElementById("invisible1");

const viewBtn2 = document.getElementById("bvwpw2");
const vis2 = document.getElementById("visible2");
const invis2 = document.getElementById("invisible2");


window.addEventListener("keydown", e => {
    if (e.code === 'Enter') {
        e.preventDefault();
        submit.click();
    }
})


viewBtn1.addEventListener("click", () => {
    if (vis1.classList.contains("d-none")) {
        vis1.classList.remove("d-none");
        invis1.classList.add("d-none");
        password.type = "text";
    }
    else {
        vis1.classList.add("d-none");
        invis1.classList.remove("d-none");
        password.type = "password";
    }

})

viewBtn2.addEventListener("click", () => {
    if (vis2.classList.contains("d-none")) {
        vis2.classList.remove("d-none");
        invis2.classList.add("d-none");
        confpw.type = "text";
    }
    else {
        vis2.classList.add("d-none");
        invis2.classList.remove("d-none");
        confpw.type = "password";
    }

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
password.addEventListener("input", (event) => {
    const value = event.target.value;

    updateRequirement('con0', value.length >= 8)
    updateRequirement('con1', /[a-z]/.test(value))
    updateRequirement('con2', /[A-Z]/.test(value))
    updateRequirement('con3', /\d/.test(value))
    updateRequirement('con4', /[#.?!@$%^&*-]/.test(value))
});

confpw.addEventListener("blur", function () {
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
        errorMsg.innerHTML = "";
    }
    else {
        signup.setAttribute("disabled", true);
        if (pass != confirmed) errorMsg.innerHTML = "Error: Passwords do not match";
        else errorMsg.innerHTML = "";
    }
})
//password validation end

// sign up using email and password
submit.addEventListener("click", function () {
    createUserWithEmailAndPassword(auth, email.value, password.value, {
        url: 'http://127.0.0.1:5500/index.html'
    })
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("signed up");
            //console.log(user);
            emailverifcationsent(); //calling function to send email id verification link
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            if (errorCode == "auth/email-already-in-use") errorMsg.innerHTML = "Email is already in use. Sign in to continue";
            else if (errorCode == "auth/invalid-email") errorMsg.innerHTML = "Invalid Email Address!";
            console.log(errorMessage);
            // ..
        });
})

//email id verification mail
const emailverifcationsent = () => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            errorMsg.innerHTML = "Verification Email sent!";
            window.open("index.html", "_parent");
        });
}