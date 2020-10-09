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

// a terrible way to fix the github.io /wiki/ problem
if (window.location.href.includes("github.io")) {
    $("source").each(function () {
      var link = $(this).attr("src").replace('wiki/..', 'wiki');
      $(this).attr("href", link);
    });
  }
  