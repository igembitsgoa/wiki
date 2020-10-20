import "./css/index.scss";
import "./js/main";

// $(window).bind('resize', function(e){
//     window.resizeEvt;
//     $(window).on('resize', function(){
//         clearTimeout(window.resizeEvt);
//         window.resizeEvt = setTimeout(function(){

//             var width = getWidth();
//             console.log(width);
//             // alert("width".concat("hi"));

//         }, 250);
//     });
// });

function resizeHeader() {
  var width = getWidth();
  var height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  var ratio = width / height;

  if (ratio < 1920 / 1080) {
    $("header").css("height", "unset");
  } else {
    $("header").css("height", "100vh");
  }
}

$(window).on("resize", function () {
  resizeHeader();
});

$(function () {
  resizeHeader();

  // a terrible way to fix the github.io /wiki/ problem
  if (window.location.href.includes("github.io")) {
    $("source").each(function () {
      var link = $(this).attr("src").replace("wiki/..", "wiki");
      $(this).attr("href", link);
    });
  }
});
