/*jslint browser: true, white: true, maxerr: 50, this */
/*global jQuery, $*/

function calc_rate(form) {
    'use strict';
    var hRate = parseInt($('input#hourly-rate').val(), 10) / 60,
        minutes = parseInt($('input#hours').val() * 60) + Number($('input#minutes').val()),
        result_id = $('#result span'),
        price = parseFloat(hRate * minutes).toFixed(2);
    if (form) {
        location.hash = form.serialize();
    }
    result_id.text(!isNaN(price) ? price : '0' );
}

jQuery(document).ready(function ($) {
    'use strict';
    $('form').on('change keyup', 'input', function(){
        calc_rate($(this).parents('form'));
    });
    if(location.hash) {
        var hashes = location.hash.substring(1).split('&');
        $.each(hashes, function(ignore, v) {
            var parseHash = v.split('=');
            $('input[name="' + parseHash[0] + '"]').val( (parseHash[1]?parseHash[1]:0) );
        });
        calc_rate();
    }
});