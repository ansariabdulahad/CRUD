// GLOBAL VARIABLES
let userData = [];
let imgUrl;
let i;
let addBtn = document.querySelector("#add-btn");
let modle = document.querySelector(".modle");
let closeBtn = document.querySelector(".close-icon");
let registerForm = document.querySelector("#register-form");
let allInput = registerForm.querySelectorAll("INPUT");
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
let updateBtn = document.querySelector("#update-btn");

// ADD BTN CODING
addBtn.onclick = function () {
    modle.classList.add("active");

    updateBtn.disabled = true;
    registerBtn.disabled = false;
}

// CLOSE BTN CODING
closeBtn.onclick = function () {
    modle.classList.remove("active");

    for (i = 0; i < allInput.length; i++) {
        allInput[i].value = "";
    }

    profilePic.src = "images/marvel-cinematic-universe-marvel-comics-iron-man-spider-man-wallpaper-preview.jpg";
}

// REGISTER BTN CODING
registerBtn.onclick = function (e) {
    e.preventDefault();
    registrationData(); // CALLING...
    registerForm.reset();
    // closeBtn.click();
    getDataFromLocal(); // CALLING...
}

// GET DATA AND STORE IN ARRAY
if (localStorage.getItem("userData") != null) {
    userData = JSON.parse(localStorage.getItem("userData"));
}

// REGISTRATION FUNCTION CODING
function registrationData() {
    if (idEl.value && nameEl.value && lNameEl.value && emailEl.value && officeEl.value && jobTitleEl.value != "") {
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
        closeBtn.click();

        Swal.fire(
            'Good job!',
            'Registration Done !',
            'success'
        )
    }
    else {
        Swal.fire(
            'Warning!',
            'Please fill all the fields !',
            'warning'
        )
    }
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
                    <button class="edit-btn" style="background-color: green;"><i class="fas fa-eye"></i></button>
                    <button class="del-btn" style="background-color: #EE534F;"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        
        `;
    });

    // START DEL BTN CODING
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

    // START EDIT BTN CODING
    let allEditBtn = document.querySelectorAll(".edit-btn");

    for (i = 0; i < allEditBtn.length; i++) {
        allEditBtn[i].onclick = function () {
            let tr = this.parentElement.parentElement;
            let td = tr.getElementsByTagName("TD");
            let index = tr.getAttribute("index");
            let imgTag = td[1].getElementsByTagName("IMG");

            let profile_pic = imgTag[0].src;
            let id = td[2].innerHTML;
            let name = td[3].innerHTML;
            let l_name = td[4].innerHTML;
            let email = td[5].innerHTML;
            let officeCode = td[6].innerHTML;
            let jobTitle = td[7].innerHTML;

            addBtn.click();
            updateBtn.disabled = false;
            registerBtn.disabled = true;

            // ASSIGN DATA TO MODEL
            idEl.value = id;
            nameEl.value = name;
            lNameEl.value = l_name;
            emailEl.value = email;
            officeEl.value = officeCode;
            jobTitleEl.value = jobTitle;
            profilePic.src = profile_pic;

            // UPDATE BTN CODING
            updateBtn.onclick = function (e) {
                e.preventDefault();

                // UPDATE USER DATA ARRAY
                userData[index] = {
                    id: idEl.value,
                    name: nameEl.value,
                    l_name: lNameEl.value,
                    email: emailEl.value,
                    officeCode: officeEl.value,
                    jobTitle: jobTitleEl.value,
                    profilePic: uploadPic.value == "" ? profilePic.src : imgUrl

                }

                // UPDATE LOCAL STORAGE
                localStorage.setItem("userData", JSON.stringify(userData));
                modle.classList.remove("active");
                getDataFromLocal(); // CALLING...
            }
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