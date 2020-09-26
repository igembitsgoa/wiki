import "../css/content.scss";
import "./main";

// format links
$('.content h1, .content > article > h2').each(function () {
    var text = $(this).text();
    $(this).text(text + ' ');
    var id = text.trim().replace(/ /g, '');
    
    if ($(this).prop('tagName') == 'H2') {
        id = $(this).prevAll('h1:first').attr('id') + "-" + id;
    }
    
    $(this).attr('id', id);
    
    var height = $(this).height();
    var link = document.createElement('a');
    link.classList.add('anchor');
    $(link).attr('href', "#" + id);
    $(link).attr('aria-hidden', "true");
    $(link).css('margin-left', -height*0.5);
    $(link).css('margin-top', height*0.265);
    $(link).css('border-right-width', height*0.1);
    $(link).css('height', height*0.5);
    $(link).css('width', height*0.5);
    $(this).prepend(link);

    // add to table of contents if h1
    if ($(this).prop('tagName') == 'H1') {
        var item = document.createElement('li');
        // $(item).addClass('list-group');

        var span = document.createElement('span');
        span.append(document.createElement('div'));
        item.append(span);
        
        var a = document.createElement('a');
        $(a).attr('href', '#' + id);
        $(a).text(text);

        item.append(a);

        $('#contents ul').append(item);
    }

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

$('#bg-attribution').tooltip();

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
var themeClass = $('main').attr('class').split(' ').filter(function(className) {
    return className.match('theme')
})
$('body').addClass(themeClass);