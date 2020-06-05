import "./css/main.scss";

var navbar = document.getElementsByClassName('navbar')[0];
var menuToggle = document.getElementById('menuToggle');
var scrollHeight = 100;
window.onscroll = function () {
    "use strict";
    if ((document.body.scrollTop >= scrollHeight || document.documentElement.scrollTop >= scrollHeight)
        && menuToggle.checked == false) {
        navbar.classList.add('nav-colored');
        navbar.classList.remove('nav-transparent');
    }
    else {
        navbar.classList.add('nav-transparent');
        navbar.classList.remove('nav-colored');
    }
};

function makeNavbarTransparent() {
    if (menuToggle.checked == true) {
        navbar.classList.add('nav-transparent');
        navbar.classList.remove('nav-colored');
    }
    else if (document.body.scrollTop >= scrollHeight || document.documentElement.scrollTop >= scrollHeight) {
        navbar.classList.add('nav-colored');
        navbar.classList.remove('nav-transparent');
    }
};
window.makeNavbarTransparent = makeNavbarTransparent;
