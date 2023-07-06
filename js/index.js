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
addBtn.onclick = function () {
    modle.classList.add("active");
}

// CLOSE BTN CODING
closeBtn.onclick = function () {
    modle.classList.remove("active");
}

// REGISTER BTN CODING
registerForm.onsubmit = function (e) {
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
        id: idEl.value,
        name: nameEl.value,
        l_name: lNameEl.value,
        email: emailEl.value,
        officeCode: officeEl.value,
        jobTitle: jobTitleEl.value,
        profilePic: imgUrl != undefined ? imgUrl : "images/marvel-cinematic-universe-marvel-comics-iron-man-spider-man-wallpaper-preview.jpg"
    });

    localStorage.setItem("userData", JSON.stringify(userData));

    Swal.fire(
        'Good job!',
        'Registration Done !',
        'success'
    )
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
                    <img src="${data.profilePic}" width="40" style="border-radius: 10px;">
                </td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.l_name}</td>
                <td>${data.email}</td>
                <td>${data.officeCode}</td>
                <td>${data.jobTitle}</td>
                <td>
                    <button style="background-color: green;"><i class="fas fa-eye"></i></button>
                    <button class="del-btn" style="background-color: #EE534F;"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        
        `;
    });

    // START DEL BTN CODING
    let i;
    let allDelBtn = document.querySelectorAll(".del-btn");

    for (i = 0; i < allDelBtn.length; i++) {

        allDelBtn[i].onclick = function () {
            let tr = this.parentElement.parentElement;
            let id = tr.getAttribute("index");

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    userData.splice(id, 1);
                    localStorage.setItem("userData", JSON.stringify(userData));
                    tr.remove();

                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        }
    }
}

getDataFromLocal(); // CALLING...

// IMAGE PROCESSING CODING
uploadPic.onchange = function () {
    // CHECK FILE SIZE 
    if (uploadPic.files[0].size < 1000000) {
        let fReader = new FileReader();

        fReader.onload = function (e) {
            imgUrl = e.target.result;
            profilePic.src = imgUrl;
        }
        fReader.readAsDataURL(uploadPic.files[0]);
    }
    else {
        Swal.fire(
            'Warning !',
            'Please upload below 1MB image!',
            'warning'
        )
    }
}