import "../css/content.scss";
import "./main";

// format links
$('.content h1').each(function () {
    var text = $(this).text();
    $(this).text(text + ' ');
    text = text.trim().replace(/ /g, '');
    $(this).attr('id', text);
    var button = document.createElement('button');
    button.classList.add('btn', 'section');
    $(button).attr('data-toggle', 'tooltip');
    $(button).attr('data-placement', 'right');
    $(button).attr('title', 'Copy link to this section!');
    $(button).text('# ');
    $(this).append(button);
});

// format in-text citations
$('.content a').each(function () {
    var link = $(this).prop('href');
    var matches = link.match('#citation(.*)')
    console.log(matches);
    if (matches) {
        $(this).addClass('citation');
        $(this).attr('id', 'intext' + matches[1]);
        var text = $(this).text();
        $(this).text('(' + text + ')');
    }
});

// format definitions
$('dfn').each(function () {
    var text = $(this).text();
    var matches = text.match('(.*)(~)(.*)');
    $(this).text(matches[1].trim());
    $(this).attr('title', matches[3].trim());
    $(this).attr('data-toggle', 'tooltip');

    $(this).tooltip();
});

$('.content .section').tooltip();

$('.content .section').click(function () {
    $(this)
        .tooltip('hide')
        .attr("data-original-title", "Doesn't work yet :/")
        .tooltip('show');
});

$('.content .section').mouseout(function () {
    $(this)
        .attr("data-original-title", "Copy a link to this section!");
});

spans = document.querySelectorAll('nobr .math span')
for (i = 0; i < spans.length; i++) {
    spans[i].style.borderLeftWidth = '0px';
}

