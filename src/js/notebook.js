import "../css/notebook.scss";
import "./main";

// format links
$(".month").each(function () {
  var id = $(this).attr("id");
  var text = $(this).find("h2").text();

  var item = document.createElement("li");
  var span = document.createElement("span");
  span.append(document.createElement("div"));
  item.append(span);

  var a = document.createElement("a");
  $(a).attr("href", "#" + id);
  $(a).text(text);

  item.append(a);

  $("#months ul").append(item);
});

$(".month").each(function () {
  var id = $(this).attr("id");

  var tabs = document.createElement("div");
  $(tabs).addClass("tabs");
  var ul = document.createElement("ul");
  tabs.append(ul);
  for (var i = 1; i <= 4; i++) {
    var li = document.createElement("li");
    if (i == 1) {
      $(li).addClass("active");
    }
    var a = document.createElement("a");
    $(a).text("Week " + i);
    $(a).attr("href", "#" + id + "week" + i);
    li.append(a);
    ul.append(li);
  }

  console.log(tabs);

  $(this).prepend(tabs);
});

$(".month").first().show();
$(".week1").show();

$("#months li a").on("click", function () {
  if (!$(this).hasClass("active")) {
    var id = $(this).attr("href");

    $("#months li a").each(function () {
      $(this).removeClass("active");
    });
    $(this).addClass("active");

    $.when($(".month").fadeOut()).then(function () {
      $(id).fadeIn();
    });

    // reset tab and active classes
    $(id).find(".tabs li").removeClass("active");
    $(id).find(".tabs li").first().addClass("active");
    $(id).find(".week").fadeOut();
    $(id).find(".week1").fadeIn();
  }
  return false;
});

$("#months-dropdown").on("change", function () {
  var id = "#" + $(this).find(":selected").val();

  $.when($(".month").fadeOut()).then(function () {
    $(id).fadeIn();
    $(id).css('display', 'block');
  });

  // reset tab and active classes
  $(id).find(".tabs li").removeClass("active");
  $(id).find(".tabs li").first().addClass("active");
  $(id).find(".week").fadeOut();
  $(id).find(".week1").fadeIn();

  return false;
});

$(".tabs li").on("click", function () {
  if (!$(this).hasClass("active")) {
    $(this)
      .siblings()
      .each(function () {
        $(this).removeClass("active");
      });
    $(this).addClass("active");

    var week = $(this).find("a").attr("href").slice(-1);
    $.when($(".week").fadeOut()).then(function () {
      $(".week" + week).fadeIn();
    });
  }
});

// sourced from https://stackoverflow.com/questions/50840168/how-to-detect-if-the-os-is-in-dark-mode-in-browsers
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  $("#themeSwitchInput").prop("checked", true);
  $("body").addClass("dark");
}

// switch to dark theme based if set in local storage
$(function () {
  if (localStorage.getItem("theme") == "dark") {
    $("body").addClass("dark");
    $("#themeSwitchInput").prop("checked", true);
  } else if (localStorage.getItem("theme") == "light") {
    $("body").removeClass("dark");
    $("#themeSwitchInput").prop("checked", false);
  }
});

$('label[for="themeSwitchInput"]').click(function () {
  if ($("#themeSwitchInput").is(":checked")) {
    $("body").addClass("dark");
    localStorage.setItem("theme", "dark");
  } else {
    $("body").removeClass("dark");
    localStorage.setItem("theme", "light");
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
