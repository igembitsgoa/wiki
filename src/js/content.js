import "../css/content.scss";
import "./main";

$('.content .section').tooltip();

$('dfn').tooltip();

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
