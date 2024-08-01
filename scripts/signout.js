import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "api-key-goes-here",
    authDomain: "app-domain-name",
    databaseURL: "rtdb-url",
    projectId: "app-id",
    storageBucket: "app-link.com",
    messagingSenderId: "sender-id",
    appId: "app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = new getAuth(app);
const db = getDatabase(app);


var userdata = " ";

auth.useDeviceLanguage();

onAuthStateChanged(auth, (user) => {
    if (user) {
        // console.log(user);
        // console.log(user.uid);
        //console.log(user.displayName);
        //console.log(user.photoURL);
        const readUPI = ref(db, 'users/' + user.uid + '/upi');
        onValue(readUPI, (snapshot) => {
            userdata = snapshot.val();
            //console.log(userdata);


            const noupi = document.getElementById("noupi");
            const loadingLabel = document.getElementById("loadingLabel");

            if (userdata != null) {
                loadingLabel.classList.add("d-none");
                document.getElementById("generate").classList.remove("disabled");
                // document.getElementById("toplabel").innerHTML = "UPI ID: " + userdata;
                document.getElementById("toplabel").innerHTML = `UPI ID: ${userdata}`;
                noupi.classList.remove("d-none");
            }
            else {
                noupi.classList.remove("d-none");
                loadingLabel.classList.add("d-none");
            }

        })

        if (user.displayName != null) {
            //split() returns an array by splitting a string depending on the token passed. selecting the first index in this syntax
            //document.getElementById("dispName").innerHTML = "User: ".concat((user.displayName).split(" ")[0]);
            document.getElementById("dispName").innerHTML = `User: ${(user.displayName).split(" ")[0]}`;
        }
        else if (user.email != null) {
            //document.getElementById("dispName").innerHTML = "User: ".concat((user.email).split("@")[0]);
            document.getElementById("dispName").innerHTML = `User: ${(user.email).split("@")[0]}`;
        }
        else {
            document.getElementById("dispName").innerHTML = "User";
        }
        // console.log(user.email);
        // console.log(user.photoURL);
        if (user.photoURL != null) {
            //document.getElementById("email").innerHTML = user.email;
            document.getElementById("photo").src = user.photoURL;
            //console.log(document.getElementById("photo").src);
            // console.log(user.photoURL);
        }
    }
    else {
        document.querySelector("body").classList.add("d-none");
        window.open("index.html", "_parent");
    }

})

const signOutBtn = document.getElementById("Gsignout");

signOutBtn.addEventListener("click", function () {
    console.log("signing out..")
    signOutBtn.innerHTML = "Signing Out...";
    signOut(auth);
    window.open("index.html", "_parent");
})