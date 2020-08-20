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

//-----------POPUP-----------
var btnAbrirPopup = document.getElementById('btn-abrir-popup');
    overlay = document.getElementById('overlay');
    popup = document.getElementById('popup');
    btnCerrarPopup = document.getElementById('btn-cerrar-popup');

btnAbrirPopup.addEventListener('click', function(){
    overlay.classList.add('active');
    popup.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function(){
    overlay.classList.remove('active');
    popup.classList.remove('active');
});

overlay.addEventListener('click', function(){
    overlay.classList.remove('active');
    popup.classList.remove('active');
});

