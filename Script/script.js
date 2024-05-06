let extraMenuBtn = document.getElementById("extraMenuBtn");
let menuForPhone = document.getElementById("menuForPhone");
let extaMenu = document.getElementById("extaMenu");
let nav_links = document.getElementsByClassName("nav_links");


// Event listen when someone click on button of menu in phone
extraMenuBtn.addEventListener("click", () => {
    if (menuForPhone.style.height != "10rem") {
        menuForPhone.style.height = "10rem";
        extaMenu.style.display = "flex";
        extaMenu.style.opacity = 1;
    } else {
        menuForPhone.style.height = "0rem";
        extaMenu.style.display = "none";
        extaMenu.style.opacity = 0;
    }
})


for (let i = 0; i < nav_links.length; i++) {
    nav_links[i].addEventListener("click", () => {
        window.addEventListener("hashchange", () => window.history.pushState({}, "", '/'), {});
    });
};

// Setting character limit in input text number 
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }
}