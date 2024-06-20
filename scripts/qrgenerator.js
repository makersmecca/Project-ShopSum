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

const username = "Shop Sum Vendor";
const amt = sessionStorage.getItem("amount");
const txnNote = "Payment_for_INR:" + amt;

const qrdiv = document.getElementById("qrcode");

const receiptbtn = document.getElementById("receipt");

const togglebtn = document.getElementById("themeBtn");
var userdata = " ";
var uName = " ";
var upiID = " ";
var upiURL = "";

var options = {
    text: null,
    colorLight: "#30373f",
    colorDark: "#fff",
    logo: "images/icons/512x512.png",
    logoBackgroundTransparent: true,
    drawer: 'svg'
};

document.getElementById("total").innerHTML = "INR " + amt;

onAuthStateChanged(auth, (user) => {
    if (user) {
        uName = user.displayName;
        const readUPI = ref(db, 'users/' + user.uid + '/upi');
        onValue(readUPI, (snapshot) => {
            userdata = snapshot.val();

            qrdiv.innerHTML = "";
            document.getElementById("loader").classList.add("d-none");
            var params = new URLSearchParams();
            params.set("am", amt);
            params.set("pn", uName);

            upiURL = "upi://pay?pa=" + userdata + "&" + params.toString() + "&tn=" + txnNote;
            if (localStorage.getItem("currentTheme") === "light") {
                options.colorLight = "#fff";
                options.colorDark = "#30373f";
            }
            options.text = upiURL;

            new QRCode(qrdiv, options); //calling function to generate the QR Code suing CDN Lib
            receiptbtn.classList.remove("d-none");
        })
    }
    else {
        console.log("not signed in");
    }
})

togglebtn.addEventListener('change', function () { //function to re generate a new qr with updated theme colors
    console.log("toggled");
    qrdiv.innerHTML = "";
    document.getElementById("loader").classList.remove("d-none");
    receiptbtn.classList.add("d-none");
    window.location.reload();
    qrdiv.innerHTML = "";
})

receiptbtn.addEventListener("click", function () {
    document.getElementById("btntxt").innerHTML = "Generating Receipt..";
})




