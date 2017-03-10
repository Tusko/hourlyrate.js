jQuery(document).ready(function($){
    $('form').on('change', 'input', function(){
        calc_rate();
    });
});

function calc_rate(){
    'use strict';
    var hRate      = parseInt($('input#hourly-rate').val(), 10) / 60,
        minutes    = parseInt($('input#hours').val() * 60) + Number($('input#minutes').val()),
        result_id  = $('#result span');
    if(hRate.length < 1) {
        alert('Enter hourly rate');
    }
    console.log(minutes);
    result_id.text( parseFloat(hRate * minutes) );
}