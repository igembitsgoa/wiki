import "../css/engineering.scss";
import "./main";

// format links
$(".content h1, .content > article > h2").each(function () {
  var text = $(this).text();
  $(this).text(text + " ");
  var id = text.trim().replace(/ /g, "");

  if ($(this).prop("tagName") == "H2") {
    id = $(this).prevAll("h1:first").attr("id") + "-" + id;
  }

  $(this).attr("id", id);

  var height = $(this).height();
  var link = document.createElement("a");
  link.classList.add("anchor");
  $(link).attr("href", "#" + id);
  $(link).attr("aria-hidden", "true");
  $(link).css("margin-left", -height * 0.5);
  $(link).css("margin-top", height * 0.265);
  $(link).css("border-right-width", height * 0.1);
  $(link).css("height", height * 0.5);
  $(link).css("width", height * 0.5);
  $(this).prepend(link);

  // add to table of contents if h1
  if ($(this).prop("tagName") == "H1") {
    var item = document.createElement("li");
    // $(item).addClass('list-group');

    var span = document.createElement("span");
    span.append(document.createElement("div"));
    item.append(span);

    var a = document.createElement("a");
    $(a).attr("href", "#" + id);
    $(a).text(text);

    item.append(a);

    $("#contents ul").append(item);
  }
});

$("#bg-attribution").tooltip();

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

// a terrible way to fix the github.io /wiki/ problem
if (window.location.href.includes("github.io")) {
  $("a").each(function () {
    var link = $(this).attr("href");
    if (
      link != "" &&
      link != "javascript:;" &&
      !link.match("/wiki/") &&
      !link.match("https") &&
      link[0] != "#"
    ) {
      if (link[0] == "/") {
        link = "/wiki" + link;
      } else {
        link = "/wiki/" + link;
      }
    }

    $(this).attr("href", link);
  });
}

$(window).resize(function () {
  $(".arrow-container").each(function () {
    var from = $(this).attr("data-from");
    var to = $(this).attr("data-to");

    var from_position = $(from).position();
    var to_position = $(to).position();

    var from_parent_position = $(from).parent().position();
    var to_parent_position = $(to).parent().position();
    var from_width = $(from).outerWidth();
    var from_height = $(from).outerHeight();

    var top = from_position.top + from_parent_position.top + from_height / 2;
    var left = from_position.left + from_parent_position.left + from_width - 1;
    var right = to_position.left + to_parent_position.left;

    var line = $(this).find("line");
    $(this).css("top", top);
    $(this).css("left", left);

    console.log(from_position, width);
    console.log(from_parent_position, width);
    console.log(to_position, width);
    console.log(to_parent_position, width);
  });
});
