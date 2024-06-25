import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
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

const versionApp = initializeApp(firebaseConfig, 'other');
const db = getDatabase(versionApp);

var currentVersion = "v";
var ver = "";

// if ('serviceWorker' in navigator) {
//     window.addEventListener("load",() => {
//         navigator.serviceWorker
//             .register("/serviceWorker.js")
//             .then(reg => console.log("service worker registered"))
//             .catch(err => console.log("service worker not registered", err))

//     })
// }
const updateBtn = document.getElementById("updateapp");
const alertDiv = document.getElementById("alertDiv");
console.log("service worker");

let permissionState;
window.addEventListener("load", (e) => {
    Notification.requestPermission().then(e => {
        //console.log(e);
        permissionState = e;
    })
})

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
        .then(registration => {
            // Check if there is a waiting service worker
            if (registration.waiting) {
                updateReady(registration.waiting);
                return;
            }

            // Listen for new updates found
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            //console.log(newWorker);
                            // New update available
                            if (permissionState === "granted") {
                                //console.log("new notif");

                                // registration.showNotification("Shop Update!",
                                //     {
                                //         body: "A new Update is ready to be installed!",
                                //         icon: "images/icons/48x48.png",
                                //         badge: "images/icons/48x48.png",
                                //     })

                                const notif = new Notification("Shop Update!", {
                                    body: "A new Update is ready to be installed!",
                                    icon: "images/icons/48x48.png",
                                    badge: "images/icons/48x48.png",
                                })

                                notif.addEventListener("click", (e) => {
                                    e.preventDefault();
                                    //console.log(e);
                                    //window.open("http://localhost:5500/", "_parent");
                                    window.open("https://letsshopsum.netlify.app/", "_parent");
                                })
                            }

                            //alert("new service worker");
                            updateReady(newWorker);
                        }
                    }
                });
            });
        })
        .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
        });

    // Reload the page to use the new service worker
    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
}

navigator.serviceWorker.addEventListener('message', event => {
    //console.log("post message");
    if (event.data.type === 'VERSION') {
        ver = event.data.version;
        localStorage.setItem("currentVer", ver);
        console.log(ver);
        set(ref(db, 'version/' + "currentVersion"), {
            version: ver,
        }).then(() => {
            //console.log("added data");
            readData();
        }).catch((error) => {
            console.log(error);
        });
        // You can use the version value here as needed
    }
});


function updateReady(worker) {
    // if (confirm('A new version of this app is available. Do you want to update?')) {
    //     worker.postMessage({ action: 'skipWaiting' });
    // }
    //alert("new update");
    alertDiv.classList.remove("d-none");
    updateBtn.addEventListener("click", () => {
        worker.postMessage({ action: 'skipWaiting' });
    })
}

function readData() {
    //console.log("reading version");
    const fetchVersion = ref(db, 'version/' + 'currentVersion' + '/version');
    onValue(fetchVersion, (snapshot) => {
        currentVersion = snapshot.val();
        //console.log(snapshot.val());
        if (localStorage.getItem("currentVer") === null) {
            document.getElementById("appVer").innerHTML = "© 2024 Copyright: ShopSum " + currentVersion;
            localStorage.setItem("currentVer", snapshot.val());
        }
        else {
            document.getElementById("appVer").innerHTML = "© 2024 Copyright: ShopSum ".concat(localStorage.getItem("currentVer"));
        }
        //document.getElementById("appVer").innerHTML = "© 2024 Copyright: ShopSum "+currentVersion;

    })
}

readData();


