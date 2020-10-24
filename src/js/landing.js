import "../css/landing.scss";
import "./main";

// sourced from https://stackoverflow.com/questions/50840168/how-to-detect-if-the-os-is-in-dark-mode-in-browsers
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    $('#themeSwitchInput').prop('checked', true);
    $('body').addClass('dark');
}

// switch to dark theme based if set in local storage
$(function(){
    if (localStorage.getItem('theme') == 'dark') {
        $('body').addClass('dark');
        $('#themeSwitchInput').prop('checked', true);
    }
    else if (localStorage.getItem('theme') == 'light') {
        $('body').removeClass('dark');
        $('#themeSwitchInput').prop('checked', false);
    }
});


$('label[for="themeSwitchInput"]').click(function() {
    if ($("#themeSwitchInput").is(":checked")) {
        $('body').addClass('dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        $('body').removeClass('dark');
        localStorage.setItem('theme', 'light');
    }
});

// apply theme class to body if it's applied to main
// this is necessary because iGEM deletes all classes applied to body
var themeClass = $("main")
  .attr("class")
  .split(" ")
  .filter(function (className) {
    return className.match("theme");
  });
$("body").addClass(themeClass);