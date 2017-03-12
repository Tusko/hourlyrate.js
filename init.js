jQuery(document).ready(function($){
    $('form').on('change keyup', 'input', function(){
        calc_rate($(this).parents('form'));
    });
    if(location.hash) {
        var hashes = location.hash.substring(1).split('&');
        $.each(hashes, function(i, v){
            var parseHash = v.split('=');
            $('input[name="' + parseHash[0] + '"]').val(parseHash[1]);
        });
        calc_rate();
    }
});

function calc_rate(form){
    'use strict';
    var hRate      = parseInt($('input#hourly-rate').val(), 10) / 60,
        minutes    = parseInt($('input#hours').val() * 60) + Number($('input#minutes').val()),
        result_id  = $('#result span');
    if(form) {
        location.hash = form.serialize();
    }
    result_id.text( parseFloat(hRate * minutes).toFixed(2) );
}