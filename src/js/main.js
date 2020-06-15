var navbar = document.querySelector('nav');
var menuToggle = document.getElementById('menuToggle');
var scrollHeight = 100; // make navbar colored/hidden beyond this

// make navbar transparent when fullscreen menu is opened
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


const body = document.body;
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
const transparent = "nav-transparent";
const colored = "nav-colored";
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll == 0) {
        body.classList.remove(scrollUp);
        return;
    }

    if (menuToggle.checked == false) {
        if (currentScroll >= scrollHeight) {
            navbar.classList.add(colored);
            navbar.classList.remove(transparent);
        }
        else {
            navbar.classList.add(transparent);
            navbar.classList.remove(colored);
        }

        if (currentScroll >= 2 * scrollHeight) {
            if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
                // down
                body.classList.remove(scrollUp);
                body.classList.add(scrollDown);
            } 
            else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
                // up
                body.classList.remove(scrollDown);
                body.classList.add(scrollUp);
            }
        }
    }

    lastScroll = currentScroll;
});

// change navbar background based on scroll
// window.onscroll = function () {
//     "use strict";
//     if ((document.body.scrollTop >= scrollHeight || document.documentElement.scrollTop >= scrollHeight)
//         && menuToggle.checked == false) {
//         navbar.classList.add('nav-colored');
//         navbar.classList.remove('nav-transparent');
//     }
//     else {
//         navbar.classList.add('nav-transparent');
//         navbar.classList.remove('nav-colored');
//     }
// };