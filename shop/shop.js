$(document).ready(function() {

    //TOGGLE del MENU NAV
    $('.menu-btn').on("click", function() {
        $(".nav-ul").animate({
            height: 'toggle',
            'padding-top': 'toggle',
            'padding-bottom': 'toggle',
            opacity: 'toggle'
        });
    });

    //TOGGLE del FILTER
    $('#filter').on("click", function() {
        $(".main-filter-ul li ul").animate({
            height: 'toggle',
            'padding-top': 'toggle',
            'padding-bottom': 'toggle',
            opacity: 'toggle'
        });
    });
});