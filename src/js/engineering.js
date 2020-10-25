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
// if (window.location.href.includes("github.io")) {
//   $("a").each(function () {
//     var link = $(this).attr("href");
//     if (
//       link != "" &&
//       link != "javascript:;" &&
//       !link.match("/wiki/") &&
//       !link.match("https") &&
//       link[0] != "#"
//     ) {
//       if (link[0] == "/") {
//         link = "/wiki" + link;
//       } else {
//         link = "/wiki/" + link;
//       }
//     }

//     $(this).attr("href", link);
//   });
// }

function positionArrows() {
  $(".arrow-container").each(function () {
    var from = $(this).attr("data-from");
    var to = $(this).attr("data-to");

    var from_self_position = $(from).position();
    var from_parent_position = $(from).parent().position();
    var from_width = $(from).outerWidth();
    var from_height = $(from).outerHeight();
    
    var to_self_position = $(to).position();
    var to_parent_position = $(to).parent().position();
    var to_height = $(to).outerHeight();
    var to_width = $(to).outerWidth();

    var from_x = from_self_position.left + from_parent_position.left;
    var from_y = from_self_position.top + from_parent_position.top;

    var to_x = to_self_position.left + to_parent_position.left;
    var to_y = to_self_position.top + to_parent_position.top;

    console.log(from_x, from_y, to_x, to_y);

    if (from_x < to_x) {
      var x1 = from_x + from_width;
      var x2 = to_x;
    }
    else if (from_x > to_x) {
      var x1 = to_x + to_width;
      var x2 = from_x;
    }
    else {
      var x1 = from_x + from_width / 2;
      var x2 = x1
    }

    if (from_y < to_y) {
      var y1 = from_y + from_height / 2;
      var y2 = to_y + to_height / 2;

      if (from_x == to_x) {
        y1 += from_height / 2;
        y2 -= to_height / 2;
      }
    }
    else {
      var y1 = to_y + to_height / 2;
      var y2 = from_y + from_height / 2;
    }

    var width = Math.abs(x2 - x1);
    var height = Math.abs(y2 - y1);

    $(this).css("left", Math.min(x1, x2));
    $(this).css("top", Math.min(y1, y2));

    var svg = $(this).find('svg')
    svg.attr('width', width);
    svg.attr('height', height);

    var line = $(this).find('line');
    line.attr('x1', (from_x < to_x ? 0 : width))  + line.attr('offset_x1');
    line.attr('y1', (from_y < to_y ? 0 : height)) + line.attr('offset_y1');
    line.attr('x2', (from_x < to_x ? width : 0))  + line.attr('offset_x2');
    line.attr('y2', (from_y < to_y ? height : 0)) + line.attr('offset_y2');
  });
};

$(document).ready(function() {
  positionArrows();
});

$(window).on('resize', function() {
  positionArrows();
});
