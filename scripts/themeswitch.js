const togglebtn = document.getElementById("themeBtn");
const themelbl = document.getElementById("themeMode");
const light = document.querySelectorAll("#light");
const dark = document.querySelectorAll("#dark");
const calculatorcont = document.getElementById("calculator-cont");
const bodyy = document.querySelector("body");
const headingg = document.querySelectorAll(".heading");
const divs = document.querySelector("div");
const brandName = document.getElementById("brandName");
const navBar = document.querySelector(".navbar");
const navToggle = document.querySelector(".navbar-toggler");
const footer = document.querySelector("footer");
const navLink = document.querySelectorAll(".nav-link");
const url = document.querySelectorAll(".url");
const secondaryBtn = document.querySelectorAll(".secondarybtn");
const browserStatusBar = document.querySelector('meta[name="theme-color"]');
const inputSelector = document.querySelectorAll("input");
const fontWeight = document.querySelectorAll(".fw-light");

const lightTheme = () => {
    //console.log("light theme");

    fontWeight.forEach((e) => {
        e.classList.add("fw-semibold");
    });

    inputSelector.forEach((e) => {
        if (!e.classList.contains("border-primary")) { e.classList.add("border-primary") };
    });

    light.forEach((e) => {
        e.classList.remove("d-none");
    });

    dark.forEach((e) => {
        e.classList.add("d-none");
    });

    calculatorcont.classList.add("bg-secondary");

    bodyy.style.backgroundColor = "#DDE6FC";
    bodyy.style.color = "#30373f";
    browserStatusBar.setAttribute('content', '#a3c5fd');
    bodyy.style.transition = "background-color 0.37s ease";
    headingg.forEach((e) => {
        e.style.color = "#30373f";
    });
    divs.style.color = "#30373f";
    // document.getElementById("brandName").style.color = "";
    brandName.classList.add("text-primary");
    navBar.classList.remove("navbar-dark");
    navBar.style.backgroundColor = "rgba(163, 197, 253,1)";

    navToggle.classList.remove("bg-dark");
    navToggle.classList.add("bg-light");
    footer.style.backgroundColor = "rgba(163, 197, 253,1)";

    navLink.forEach((e) => {
        if (e.classList.contains("active")) { e.style.textShadow = "2px 2px 5px #1e5892" };
    });

    url.forEach((e) => {
        // e.style.color = "blue";
        e.classList.remove("text-light");
        e.classList.add("text-primary");
    });
    secondaryBtn.forEach((e) => {
        e.classList.remove("btn-secondary");
        e.classList.add("btn-primary");
    });

}

const darkTheme = () => {
    //console.log("dark theme");
    fontWeight.forEach((e) => {
        if (e.classList.contains("fw-semibold"))
            e.classList.remove("fw-semibold");
    });

    inputSelector.forEach((e) => {
        if (e.classList.contains("border-primary")) { e.classList.remove("border-primary") };
    });

    light.forEach((e) => {
        e.classList.add("d-none");
    });

    dark.forEach((e) => {
        e.classList.remove("d-none");
    });

    calculatorcont.classList.remove("bg-secondary");
    // document.getElementById("light").classList.add("d-none");
    // document.getElementById("dark").classList.remove("d-none");
    bodyy.style.backgroundColor = "#30373f";
    bodyy.style.color = "#9ac9ff";
    browserStatusBar.setAttribute('content', '#262c32');
    bodyy.style.transition = "background-color 0.37s ease";
    // document.getElementById("brandName").style.color = "white";
    brandName.classList.remove("text-primary");
    navBar.classList.add("navbar-dark");
    navBar.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    navToggle.classList.add("bg-dark");
    navToggle.classList.remove("bg-light");

    footer.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    headingg.forEach((e) => {
        e.style.color = "white";
    });
    navLink.forEach((e) => {
        if (e.classList.contains("active")) { e.style.textShadow = "0px 0px 100px" };
    });

    url.forEach((e) => {
        //e.style.color = "white";
        e.classList.remove("text-primary");
        e.classList.add("text-light");
    });
    secondaryBtn.forEach((e) => {
        e.classList.add("btn-secondary");
        e.classList.remove("btn-primary");
    });
}

// if (togglebtn.checked) {
//     //console.log("checked");
//     lightTheme();
// }

let setTheme = "dark";
let getTheme = localStorage.getItem("currentTheme");

if (localStorage.getItem("currentTheme") === "light") {
    togglebtn.setAttribute("checked", true);
    lightTheme();
}

else {
    togglebtn.removeAttribute("checked");
    darkTheme();
}

togglebtn.addEventListener('change', function () {
    if (togglebtn.checked) {
        //console.log(localStorage.getItem("currentTheme"));
        setTheme = "light";
        lightTheme();
    }
    else {
        //console.log(localStorage.getItem("currentTheme"));
        setTheme = "dark";
        darkTheme();
    }
    localStorage.setItem("currentTheme", setTheme);
    //console.log(localStorage.getItem("currentTheme"));
});
