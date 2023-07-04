// GLOBAL VARIABLES
let userData = [];
let addBtn = document.querySelector("#add-btn");
let modle = document.querySelector(".modle");
let closeBtn = document.querySelector(".close-icon");
let registerForm = document.querySelector("#register-form");
let idEl = document.querySelector("#id");
let nameEl = document.querySelector("#name");
let lNameEl = document.querySelector("#l-name");
let emailEl = document.querySelector("#email");
let officeEl = document.querySelector("#office-code");
let jobTitleEl = document.querySelector("#job-title");
let registerBtn = document.querySelector("#register-btn");

// ADD BTN CODING
addBtn.onclick = function() {
    modle.classList.add("active");
}

// CLOSE BTN CODING
closeBtn.onclick = function() {
    modle.classList.remove("active");
}

// REGISTER BTN CODING
registerBtn.onclick = function(e) {
    e.preventDefault();
    registrationData(); // CALLING...
    registerForm.reset();
    closeBtn.click();
}

// GET DATA AND STORE IN ARRAY
if (localStorage.getItem("userData") != null) {
    userData = JSON.parse(localStorage.getItem("userData"));
}

// REGISTRATION FUNCTION CODING
function registrationData() {
    userData.push({
        id : idEl.value,
        name : nameEl.value,
        l_name : lNameEl.value,
        email : emailEl.value,
        officeCode : officeEl.value,
        jobTitle : jobTitleEl.value
    });

    localStorage.setItem("userData", JSON.stringify(userData));
}

// START RETURNING DATA ON PAGE FROM LOCAL STORAGE
