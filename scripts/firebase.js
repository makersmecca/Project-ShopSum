
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, setPersistence, inMemoryPersistence, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = new getAuth(app);
auth.useDeviceLanguage();

const provider = new GoogleAuthProvider();

const glogin = document.getElementById("googlesignin");
const defsignin = document.getElementById("defaultsignin");
const email = document.getElementById("emailID");
const passw = document.getElementById("password");

const viewBtn = document.getElementById("bvwpw");
const vis = document.getElementById("visible");
const invis = document.getElementById("invisible");

window.addEventListener("keydown", e => {
    if (e.code === 'Enter') {
        e.preventDefault();
        defsignin.click();
    }
})

viewBtn.addEventListener("click", () => {
    if (vis.classList.contains("d-none")) {
        vis.classList.remove("d-none");
        invis.classList.add("d-none");
        passw.type = "text";
    }
    else {
        vis.classList.add("d-none");
        invis.classList.remove("d-none");
        passw.type = "password";
    }

})

//if user is signed in then redirect to calculator page
onAuthStateChanged(auth, (user) => {
    //console.log(user);
    //console.log(user.phoneNumber);
    try {
        if ((auth.currentUser.emailVerified) || (user.phoneNumber != null)) {
            //console.log(user);
            defsignin.innerHTML = "Signing In...";
            document.getElementById("loader").classList.remove("d-none");
            window.open("calculator.html", "_parent");
        }
    }
    catch { //console.log("no user/email not verified");
    }
})

const errorMsg = document.getElementById("errorMsg");

// sign in with email id and password
defsignin.addEventListener("click", function () {

    signInWithEmailAndPassword(auth, email.value, passw.value)
        .then((userCredential) => {

            // Signed in 
            auth.currentUser.reload();                  //refresh the current user details

            //console.log(auth.currentUser.emailVerified);
            if (auth.currentUser.emailVerified) { //checks if the email id of the user has been verified or not
                const user = userCredential.user;
                console.log("signed in");
                defsignin.innerHTML = "Signing In...";
                document.getElementById("loader").classList.remove("d-none");
                errorMsg.innerHTML = "";
                //console.log(user);
                window.open("calculator.html", "_parent");
            }
            else {

                console.log("not verified");
                errorMsg.classList.add("invalid");
                errorMsg.classList.remove("d-none");
                errorMsg.innerHTML = "Email Id has not been verified";

            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            if (errorCode == "auth/invalid-credential" || errorCode == "auth/invalid-email") {
                errorMsg.classList.add("invalid");
                errorMsg.classList.remove("d-none");
                errorMsg.innerHTML = "Incorrect Email ID or Password";
                document.getElementById("forgotpw").classList.remove("d-none");
            }
            else if (errorCode == "auth/missing-password") {
                errorMsg.classList.add("invalid");
                errorMsg.classList.remove("d-none");
                errorMsg.innerHTML = "Please enter Password";
                document.getElementById("forgotpw").classList.remove("d-none");
            }
            else if (errorCode == "auth/network-request-failed") {
                errorMsg.classList.add("invalid");
                errorMsg.classList.remove("d-none");
                errorMsg.innerHTML = "Please Check your Internet Connection";
                document.getElementById("forgotpw").classList.remove("d-none");
            }
            console.log(errorMessage);
        });
})


// sign in with google account
glogin.addEventListener("click", function () {
    console.log("sign-in initiated..");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            glogin.innerHTML = "Signing In..";
            document.getElementById("loaderG").classList.remove("d-none");
            errorMsg.innerHTML = "";
            window.open("calculator.html", "_parent");

        } else {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    //console.log(token);
                    //console.log(user);

                }).catch((error) => {
                    errorMsg.classList.add("invalid");
                    errorMsg.classList.remove("d-none");
                    errorMsg.innerHTML = "Error!";
                    //console.log(error);
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    // const email = error.customData.email;
                    // const credential = GoogleAuthProvider.credentialFromError(error);
                });
        }


    });
})