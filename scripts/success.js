var ref = sessionStorage.getItem("payment_id");
var order = sessionStorage.getItem("order_id");
// var amt = "INR ".concat((sessionStorage.getItem("amount")).slice(0, (sessionStorage.getItem("amount")).length - 2));
var amt = "INR ".concat(sessionStorage.getItem("amount").toString());

const backBtn = document.getElementById("done");

const shareBtn = document.getElementById("shareBtn");
const sendBtn = document.getElementById("sendBtn");

let waNum = "";



// console.log(ref);
// console.log(order);
// console.log(amt);

document.getElementById("amount").innerHTML = amt;
document.getElementById("orderid").innerHTML = order;
document.getElementById("payRef").innerHTML = ref;

backBtn.addEventListener("click", function () {
    //console.log("done");
    sessionStorage.clear();
    window.open("calculator.html", "_parent");
});

shareBtn.addEventListener("click", () => {
    console.log("share button clicked");
    document.getElementById("numberDiv").classList.remove("d-none");

    console.log(waNum);
})

sendBtn.addEventListener("click", () => {
    waNum = (document.getElementById("receiverNum").value).toString();
    //console.log(waNum);
    //const msg = "Hello from ShopSum!%0AHere's your receipt:%0AYour Order ID: "+order+",%0APayment Reference ID: "+ref+",%0AOrder Amount: "+amt+"%0AThank you!";
    const msg = `Hello from ShopSum!%0AHere's your receipt:%0AYour Order ID: ${order},%0APayment Reference ID: ${ref},%0AOrder Amount: ${amt}%0AThank you!`;

    //var waUrl = "https://wa.me/" + waNum + "?text=" + msg;
    var waUrl = `https://wa.me/${waNum}?text=${msg}`;
    //console.log(waUrl);
    window.open(waUrl);
})
