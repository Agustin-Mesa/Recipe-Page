$(document).ready(function() {

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

document.querySelector('.menu-btn').addEventListener('click', () => { 
    document.querySelector('.nav-ul').classList.toggle('show');
});