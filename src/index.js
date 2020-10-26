import "./css/index.scss";
import "./js/main";

function resizeHeader() {
  var width = getWidth();
  var height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  var ratio = width / height;

  if (ratio < 1200 / 1080) {
    $("header").css("height", "unset");
    $("header video").css("margin-top", "17%");
  } else if (ratio < 1920 / 1080) {
    $("header").css("height", "unset");
    $("header video").css("margin-top", "0");
  } else {
    $("header").css("height", "100vh");
    $("header video").css("margin-top", "0");
  }
} 

$('video').on('click', function() {
  if (!$(this)[0].hasAttribute('controls')) {
    $(this).attr('controls', '');
  }
  var video = document.querySelector('video');
  video.play();
  $(this).prop('muted', false);
  video.volume = 0.6;

  $('#tap-icon').fadeOut();

  return false;
});

$(window).on("resize", function () {
  resizeHeader();
});

$(function () {
  resizeHeader();

  // // a terrible way to fix the github.io /wiki/ problem
  // if (window.location.href.includes("github.io")) {
  //   $("source").each(function () {
  //     var link = $(this).attr("src");
  //     $(this).attr("src", "/wiki/" + link);
  //   });
  // }
});
