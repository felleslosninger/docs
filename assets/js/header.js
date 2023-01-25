$(function() {
    // Fjerning av tomme UL

 window.onload = function(){ // When the page has finished loading.
    $(".docnav").each(function(){ // Check every "ul" 
    if($(this).children().length == 0){ 
        $(".sidebar-inner").remove(); 
        } else{
        $(this).show();
        $(this).css("display", "block");
        }
     }
)}

    $(window).scroll(function(e) {
        var boxHeight = 1000;
        var baseColorValue = 246;
        var offset = 0;
        var scrollPos = $(document).scrollTop();
        var spectrum = 255 - baseColorValue;

        var progress = (scrollPos / boxHeight);

        offset =  progress * spectrum;

        var color = 'rgb(' + (baseColorValue + offset) + ',' + (baseColorValue + offset) + ',' + (baseColorValue + offset) + ')';
        $('.nav-overlay').css({'background-color': color})
    });

    $('.toggle-sidebar-button').click(function () {

        $(this).toggleClass('collapsed');
        $('.sidebar-offcanvas').toggleClass('sidebar-offcanvas--open');

        $('.toggle-menu-button').addClass('collapsed');
        $('.navbar-collapse').removeClass('show');

    });

    $('.toggle-menu-button').click(function () {
        $('.toggle-sidebar-button').addClass('collapsed');
        $('.sidebar-offcanvas').removeClass('sidebar-offcanvas--open');
    });

});

