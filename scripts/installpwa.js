let installPrompt = null;
const installB = document.getElementById("installBtn");
const iosBanner = document.getElementById("iosBanner");

//console.log("installpwa.js is running");
//console.log(installButton);

const standaloneCheck = () => {
    ('standalone' in window.navigator) && (window.navigator.standalone);
}

const isIos = () => {
    const deviceType = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(deviceType);
}

if (isIos() && !standaloneCheck()) {
    iosBanner.classList.remove("d-none");
}

window.addEventListener("beforeinstallprompt", (event) => {
    //console.log(event);
    event.preventDefault();
    installPrompt = event;
    installB.classList.remove("d-none");
});

installB.addEventListener("click", async () => {
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