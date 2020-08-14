document.querySelector('.menu-btn').addEventListener('click', () => { 
    document.querySelector('.nav-main ul').classList.toggle('show');
});

$('#filter').on("click", function() {
    $(".main-filter-ul li ul").animate({
        height: 'toggle',
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: 'toggle'
    });
});