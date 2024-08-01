let installPrompt = null;
const installButton = document.getElementById("installBtn");
const iosBanner = document.getElementById("iosBanner");
//const redirectButton = document.getElementById("redirectBtn");
const permDiv = document.getElementById("permDiv")
const allowNotifBtn = document.getElementById("allowNotif");

const standaloneCheck = () => {
    ('standalone' in window.navigator) && (window.navigator.standalone);
}
const isIos = () => {
    const deviceType = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(deviceType);
}

if (isIos() && !standaloneCheck()) {
    iosBanner.classList.remove("d-none");
} else { iosBanner.classList.add("d-none"); }

const requestNotifPerm = () => {
    Notification.requestPermission().then(e => {
        //console.log(e);
        if (e === "default") {
            permDiv.classList.remove("d-none");
        }
        else if (e === "denied") {
            permDiv.classList.remove("d-none");
            allowNotifBtn.classList.add("d-none");
        }
        else permDiv.classList.add("d-none");
    })
}

// App install status check
// window.addEventListener("load", () => {
//     requestNotifPerm();
//     if ((window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone) {
//         //console.log('display-mode is standalone');
//         redirectButton.classList.add("d-none");
//     }
//     else if ((window.matchMedia('(display-mode: browser)').matches) || (!navigator.standalone)) {
//         //console.log("disp mode browser");
//         if (installButton.classList.contains("d-none")) {
//             redirectButton.classList.remove("d-none");
//         }
//     }
// })

// redirectButton.addEventListener("click", () => {
//     //console.log("redirecting..");
//     window.open("index.html", "_parent");
// })

allowNotifBtn.addEventListener("click", () => {
    requestNotifPerm();
})




window.addEventListener("beforeinstallprompt", (event) => {
    //console.log(event);
    event.preventDefault();
    installPrompt = event;
    //redirectButton.classList.add("d-none");
    installButton.classList.remove("d-none");

});

installButton.addEventListener("click", async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    //console.log(`Install prompt was: ${result.outcome}`);
    disableInAppInstallPrompt();
});

window.addEventListener("appinstalled", () => {
    disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
    installPrompt = null;
    installButton.classList.add("d-none");
}


