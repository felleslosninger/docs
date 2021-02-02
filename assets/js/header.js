$(function() {
    $(window).scroll(function(e) {
        var boxHeight = 1000;
        var baseColorValue = 246;
        var offset = 0;
        var scrollPos = $(document).scrollTop();
        var spectrum = 255 - baseColorValue;

        var progress = (scrollPos / boxHeight);

        offset =  progress * spectrum;

        var color = 'rgb(' + (baseColorValue + offset) + ',' + (baseColorValue + offset) + ',' + (baseColorValue + offset) + ')';
        $('.tomato').css({'background-color': color})
    });

});
