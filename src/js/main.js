import "bootstrap";
var $ = require("jquery");
window.jQuery = $;
window.$ = $;

var navbar = document.querySelector(".navbar");
var menuToggle = document.getElementById("menuToggle");
var scrollHeight = 100; // make navbar colored/hidden beyond this
var sm = 768; // small viewport width
var xs = 576; // medium viewport width

// reset iGEM
if (window.location.href.includes("igem.org")) {
  var ids = ["HQ_page", "content", "bodyContent", "mw-content-text"];
  for (var i = 0; i < ids.length; i++)
    document.querySelector("#" + ids[i]).removeAttribute("id");
  var classes = ["mw-content-ltr"];
  for (var i = 0; i < classes.length; i++) {
    var elements = document.querySelectorAll("." + classes[i]);
    for (var j = 0; j < elements.length; j++) {
      elements[j].classList.remove(classes[i]);
    }
  }
}

// make navbar transparent when fullscreen menu is opened
function makeNavbarTransparent() {
  if (menuToggle.checked == true) {
    navbar.classList.add("nav-transparent");
    navbar.classList.remove("nav-colored");
  } else if (
    document.body.scrollTop >= scrollHeight ||
    document.documentElement.scrollTop >= scrollHeight
  ) {
    navbar.classList.add("nav-colored");
    navbar.classList.remove("nav-transparent");
  }
}
window.makeNavbarTransparent = makeNavbarTransparent;

// navbar show on hover
$("#nav-headings li").hover(
  // handler in
  function () {
    $("#nav-headings li").each(function () {
      $(this).removeClass("active");
      $(this).addClass("inactive");
    });

    $(this).removeClass("inactive");
    $(this).addClass("active");

    var id = $(this).find("a").attr("id");

    $("#nav-items .tab-pane").each(function () {
      $(this).removeClass("active");
    });

    var tab_name = id.split("-")[0];
    $("#" + tab_name + "-pane").addClass("active");
  },
  // handler out - nothing
  function () {}
);

// close navbar on escape
$(document).keyup(function (e) {
  if (e.keyCode == 27 && $("#menuToggle").is(":checked")) {
    // escape key maps to keycode `27`
    $("#menuToggle").prop("checked", false);
  }
});

// close submenus when menu is opened
$("label[for='menuToggle']").click(function () {
  $("#nav-headings li").each(function () {
    $(this).removeClass("active");
    $(this).removeClass("inactive");
  });

  $("#nav-items .tab-pane").each(function () {
    $(this).removeClass("active");
  });
});

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
    } else {
      navbar.classList.add(transparent);
      navbar.classList.remove(colored);
    }

    if (currentScroll >= scrollHeight) {
      if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
        // down
        body.classList.remove(scrollUp);
        body.classList.add(scrollDown);
      } else if (
        currentScroll < lastScroll &&
        body.classList.contains(scrollDown)
      ) {
        // up
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
      }
    }
  }

  lastScroll = currentScroll;
});

function getWidth() {
  return Math.max(
    // document.body.scrollWidth,
    // document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

// show/hide nav on mobile
$(".nav-heading").on("click", function () {
  if (getWidth() <= sm) {
    if ($(this).siblings("ul").css("display") === "none") {
      $("#menuContent ul").slideUp();
      $(this).siblings("ul").slideDown();
    } else {
      $("#menuContent ul").slideUp();
    }
  }
});

$("#menuSwitch").on("click", function () {
  if (getWidth() <= sm) {
    $("#menuContent ul").slideUp();
  }
});

// show/hide footer on mobile
$(".footer-heading").on("click", function () {
  if (getWidth() <= xs) {
    if ($(this).siblings("ul").css("display") === "none") {
      $("#footerNav ul").slideUp();
      $(this).siblings("ul").slideDown();
    } else {
      $("#footerNav ul").slideUp();
    }
  }
});
