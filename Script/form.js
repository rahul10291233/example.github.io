const scriptURL = 'https://script.google.com/macros/s/AKfycbzUqSxvQXz0iHSj1n0Lo1sIkpfuALZ52mf2ulHtpkdbouQbHfUEDhk4qfGIlYNviGcBVg/exec';
const form = document.forms['Google-Sheet'];

// Define Variables
const fname = document.getElementById("fname");
const faddr = document.getElementById("faddr");
const fphone = document.getElementById("fphone");
const submit = document.getElementById("submit");
const fdate = document.getElementById("fdate");
const ftime = document.getElementById("ftime");
const blurBG = document.getElementById("blur");
const loading = document.getElementById("loading");
const phnParent = document.getElementById("phnParent");
const inputs = document.getElementsByClassName("inputs");
const thnkScrnContUs = document.getElementById("thnkScrnContUs");

//Craeting Date 
function addDate() {
    const time = new Date;
    const date = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    let FullDate = `${date}-${month}-${year}`;
    let FullTime = `${hours}:${minutes}:${seconds}`;
    fdate.value = FullDate;
    ftime.value = FullTime;
}

setInterval(() => {
    addDate();
}, 3000);

function thankScrnContUs() {
    thnkScrnContUs.style.display = 'flex';
    blurBG.style.display = 'none';
    loading.style.display = 'none';
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    setTimeout(() => {
        thnkScrnContUs.style.display = 'none';
    }, 3500);
}

//Check If user written his/her details
fname.addEventListener('keyup', () => {
    if (fname.value.trim() !== "") {
        fname.style.border = 'transparent';
        fname.setCustomValidity(''); // Clear any previous custom error message
    } else {
        fname.style.border = '2px solid red';
    }
})
faddr.addEventListener("keyup", () => {
    if (faddr.value.trim() !== "") {
        faddr.style.outline = 'transparent';
        faddr.setCustomValidity(''); // Clear any previous custom error message
    } else {
        faddr.style.outline = '2px solid red';
    }
})
fphone.addEventListener("keyup", () => {
    if (fphone.value.trim() !== "") {
        phnParent.style.border = 'transparent';
        fphone.setCustomValidity(''); // Clear any previous custom error message
    } else {
        phnParent.style.border = '2px solid red';
    }
})

let mainCheckPass = 0;
submit.addEventListener("click", function () {
    let checkPass = 0;
    // Name Field Checking 
    if (fname.value.trim() !== "") { // Check if value contains non-whitespace characters
        fname.style.border = 'transparent';
        fname.setCustomValidity(''); // Clear any previous custom error message
        checkPass = 1;
    } else {
        checkPass = 0;
        fname.style.border = '2px solid red';
        fname.setCustomValidity('Enter Your Name Correctly.'); // Set custom error message
        fname.focus();
    }
    // Address Field Checking
    if (faddr.value.trim() !== "") { // Check if value contains non-whitespace characters
        faddr.style.outline = 'transparent';
        if (fname.style.border != '2px solid red') {
            checkPass = 2;
            faddr.setCustomValidity(''); // Clear any previous custom error message
        } else {
            fname.setCustomValidity('Enter Your Name Correctly.'); // Set custom error message
            fname.focus();
        }
    } else {
        if (fname.style.border != '2px solid red') {
            checkPass = 1;
            faddr.style.outline = '2px solid red';
            faddr.setCustomValidity('Enter your home address correctly.'); // Set custom error message
        } else {
            checkPass = 0;
        }
    }
    //Phone Number Field Checking
    if (fphone.value.length != "10") {
        if (checkPass == 0) {
            fname.focus();
        } else if (checkPass == 1) {
            faddr.focus();
        } else if (checkPass == 2) {
            phnParent.style.border = '2px solid red';
            fphone.setCustomValidity('Enter your phone number correctly.') // Set custom error message
            fphone.focus
        }
    } else {
        if (checkPass == 0) {
            fname.focus();
        } else if (checkPass == 1) {
            faddr.focus();
        } else if (checkPass == 2) {
            phnParent.style.border = 'transparent';
            fphone.setCustomValidity(''); // Clear any previous custom error message
            checkPass = 3;
        }
    }
});

form.addEventListener('submit', e => {
    e.preventDefault();
    submit.disabled = true;
    setTimeout(() => {
        submit.disabled = false;
    }, 3000);
    blurBG.style.display = 'flex';
    loading.style.display = 'flex';
    setTimeout(() => {
        blurBG.style.opacity = '1';
        loading.style.opacity = '1';
    }, 300);
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => thankScrnContUs())
        .catch(error => console.error('Error!', error.message))
});
