import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Declarations and initializations
// Firebase Console -> Project Overview-> Project Settings -> General -> Your App -> Config
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
const auth = getAuth(app);

const db = getDatabase(app);


const idupi = document.getElementById("upiID");
const savebtn = document.getElementById("savebtn");
const userName = document.getElementById("username");

var userdata = " ";

function displayUPI(dispValue) {
    document.getElementById("displayid").innerHTML = dispValue;
}

function readData() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            //console.log(user);
            if (user.email != null) { userName.innerHTML = user.email; }
            else if (user.displayName != null) { userName.innerHTML = user.displayName };
            // if(user.email == null){userName.innerHTML = user.displayname}
            //console.log("reading data");
            const readUPI = ref(db, 'users/' + user.uid + '/upi');
            onValue(readUPI, (snapshot) => {
                const data = snapshot.val();
                //console.log(data);
                displayUPI(data);
                if (data != null) {
                    savebtn.innerHTML = "Update UPI ID";
                }
                else displayUPI("UPI ID is not set");
            })
        }
        else {
            //console.log("not signed in");
        }
    })
}

function validateUPI() {
    let upi = idupi.value;
    //console.log(upi);

    if (upi.length <= 0 || upi.length > 50) return false;
    else if (!upi.includes("@")) return false;
    else if (/[^a-zA-Z0-9._@-]/.test(upi)) return false;
    else return true;
}

readData(); // calling readData function on page load to fetch and display user's email and upi.


// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         //console.log(user);
//         userName.innerHTML = user.email;
//         console.log("reading data");
//         const readUPI = ref(db, 'users/' + user.uid + '/upi');
//         onValue(readUPI, (snapshot) => {
//             userdata = snapshot.val();
//             displayUPI(userdata);
//             //console.log(userdata);
//             if (userdata != null) { 
//                 savebtn.innerHTML = "Update UPI ID"; 
//             }
//         })
//     }
//     else {
//         console.log("not signed in");
//     }
// })

//update upi
savebtn.addEventListener("click", function () {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            //console.log(user.uid);
            const validated = validateUPI();
            if (validated == true) {
                set(ref(db, 'users/' + user.uid), {
                    upi: idupi.value,
                }).then(() => {
                    //console.log("added data");
                    readData();
                    window.open("calculator.html", "_parent");
                }).catch((error) => {
                    //console.log(error);
                });
            }
            else {
                displayUPI("Invalid UPI ID!");
                document.getElementById("displayid").classList.add("invalid");
                //console.log("invalid upi id");
            }
        }
        else {
            //console.log("not signed in");
        }
    })
})

