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
    $(id).find('.tabs li').removeClass('active');
    $(id).find('.tabs li').first().addClass('active');
    $(id).find('.week').fadeOut();
    $(id).find('.week1').fadeIn();
  }
  return false;
});

$(".tabs li").on("click", function () {
  if (!$(this).hasClass("active")) {
    
    $(this).siblings().each(function() {
      $(this).removeClass('active');
    })
    $(this).addClass('active');

    var week = $(this).find("a").attr("href").slice(-1);
    $.when($(".week").fadeOut()).then(function () {
      $(".week" + week).fadeIn();
    });
  }
});