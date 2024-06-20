const version = "v0.8.4"
const serviceworkerobj = "shopsummary_" + version;
// console.log(serviceworkerobj);
// console.log('hello from service worker');
const assets = [

    "/calculator.html",
    "/emailSignup.html",
    "/fallback.html",
    "/forgotpassword.html",
    "/paymentStatus.html",
    "/phoneSignup.html",
    "/pwreset.html",
    "/qrgenerate.html",
    "/savedata.html",

    "/style/bootstrap.css",
    "/style/calc.css",
    "/style/default.css",
    "/style/index.css",
    "/style/paymentStatus.css",
    "/style/style.css",

    "/scripts/emailSignup.js",
    "/scripts/firebase.js",
    "/scripts/forgotpw.js",
    "/scripts/installpwa.js",
    "/scripts/main.js",
    "/scripts/phoneSignup.js",
    "/scripts/pwreset.js",
    "/scripts/qrgenerator.js",
    "/scripts/saveupi.js",
    "/scripts/signout",
    "/scripts/success.js",
    "/scripts/txnprocessing.js",
    "scripts/themeswitch.js",

    "/images/icons/16x16.png",
    "/images/icons/32x32.png",
    "/images/icons/48x48.png",
    "/images/icons/64x64.png",
    "/images/icons/72x72.png",
    "/images/icons/96x96.png",
    "/images/icons/128x128.png",
    "/images/icons/144x144.png",
    "/images/icons/168x168.png",
    "/images/icons/192x192.png",
    "/images/icons/256x256.png",
    "/images/icons/512x512.png",
    "/images/icons/1024x1024.png",

    "/images/user.png",

    "/images/icons/btn-logos/download-icon-64.png",
    "/images/icons/btn-logos/google-icon-48.png",
    "/images/icons/btn-logos/icons8-phone-64.png",

    "/images/icons/social-media-logos/facebook-black-32.png",
    "/images/icons/social-media-logos/github-black-32.png",
    "/images/icons/social-media-logos/twitter-32.png",

    "/images/icons/152px.png",
    "/images/icons/180px.png",
    "/images/icons/167px.png"
];

self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

//install event
self.addEventListener("install", installEvent => {
    //console.log("install event");
    //self.skipWaiting();
    installEvent.waitUntil(
        caches.open(serviceworkerobj)
            .then(cache => {
                cache.addAll(assets)
                //console.log('caching assets')
            }).catch(err => console.log(err))
    );
});

// activate event
self.addEventListener('activate', evt => {
    //console.log("activate event");
    evt.waitUntil(
        caches.keys().then(key => {
            //console.log(keys);
            //console.log('service worker activated');
            return Promise.all(key
                .filter(key => key !== serviceworkerobj)
                .map(key => caches.delete(key))
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
    self.clients.matchAll().then(clients => {
        //console.log(version);
        //console.log(clients);
        clients.forEach(client => client.postMessage({ type: 'VERSION', version: version }));
    });
});

//fetch event
self.addEventListener("fetch", fetchEvent => {
    //console.log("fetchEvent");
    fetchEvent.respondWith
        (
            caches.match(fetchEvent.request)
                .then(res => {
                    return res || fetch(fetchEvent.request)
                }).catch(() => caches.match("/fallback.html"))
        );
});