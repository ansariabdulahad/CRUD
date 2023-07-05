// GLOBAL VARIABLES
let userData = [];
let imgUrl;
let addBtn = document.querySelector("#add-btn");
let modle = document.querySelector(".modle");
let closeBtn = document.querySelector(".close-icon");
let registerForm = document.querySelector("#register-form");
let profilePic = document.querySelector("#profile-pic");
let uploadPic = document.querySelector("#upload-field");
let idEl = document.querySelector("#id");
let nameEl = document.querySelector("#name");
let lNameEl = document.querySelector("#l-name");
let emailEl = document.querySelector("#email");
let officeEl = document.querySelector("#office-code");
let jobTitleEl = document.querySelector("#job-title");
let tableData = document.querySelector("#table-data");
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
registerBtn.onsubmit = function(e) {
    e.preventDefault();
    registrationData(); // CALLING...
    registerForm.reset();
    closeBtn.click();
    getDataFromLocal(); // CALLING...
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
        jobTitle : jobTitleEl.value,
        profilePic : imgUrl != undefined ? imgUrl : "images/marvel-cinematic-universe-marvel-comics-iron-man-spider-man-wallpaper-preview.jpg"
    });

    localStorage.setItem("userData", JSON.stringify(userData));
}

// START RETURNING DATA ON PAGE FROM LOCAL STORAGE

// GET DATA FROM LOCAL FUNCTION CODING
const getDataFromLocal = () => {
    tableData.innerHTML = "";
    userData.forEach((data, index) => {

        tableData.innerHTML += `
        
            <tr index=${index}>
                <td>${index + 1}</td>
                <td>
                    <img src="${data.profilePic}" width="40" height="40" style="border-radius: 10px;">
                </td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.l_name}</td>
                <td>${data.email}</td>
                <td>${data.officeCode}</td>
                <td>${data.jobTitle}</td>
                <td>
                    <button style="background-color: green;"><i class="fas fa-eye"></i></button>
                    <button style="background-color: #EE534F;"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        
        `;
    })
}

getDataFromLocal(); // CALLING...

// IMAGE PROCESSING CODING
uploadPic.onchange = function() {
    // CHECK FILE SIZE 
    if(uploadPic.files[0].size < 1000000) {
        let fReader = new FileReader();

        fReader.onload = function(e) {
            imgUrl = e.target.result;
            profilePic.src = imgUrl;
        }
        fReader.readAsDataURL(uploadPic.files[0]);
    }
    else {
        alert("Please upload below 1MB image");
    }
}