var defaultPage = defaultPage || {};

defaultPage.resize = function() {
    var sidebarPadding = 40,
        newHeight = $(window).height() - $(".HeaderWrapper").outerHeight();
    $(".SidebarWrapper").height(newHeight - sidebarPadding);
    $(".MarkdownWrapper").height(newHeight);
}

$(document).ready(function() {
    defaultPage.resize();

    $(window).resize(function(){
        defaultPage.resize();
    });
});

