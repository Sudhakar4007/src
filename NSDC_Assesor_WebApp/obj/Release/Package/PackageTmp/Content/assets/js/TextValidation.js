

function formControlValidation() {

    //
    $(".numeric").numeric();
    //
    $(".positive-integer").numeric({ decimal: false, negative: false },
        function () { this.value = "0"; this.focus(); });
    $(".decimal-2-places").numeric({ decimalPlaces: 2, negative: false });

    $(".Negative-decimal-2-places").numeric({ decimalPlaces: 2});
    //
    $(".negativenumeric").numeric({ decimal: false }, function () { this.value = "0"; this.focus(); });
    
    //alfaNumeric with space
    $(".valAlphaNumericWithSpace").alphanum();
    //alfaNumeric with space and Comma
    $(".valAlphaNumericWithSpaceComma").alphanum({ allow: ',' });

    $(".valAlphaNumericForCompanny").alphanum({ allow: '&(),.' });
    //alfaNumeric
    $(".valAlphaNumeric").alphanum({ allowSpace: false });
    //alfaNumeric with Special Char
    $("#valAlphaNumericWithSpecialChar").alphanum({ allow: '`~!@#$%^&*()_+|-=<>?:",./;\'\\{}[]', allowSpace: false });

    $(".user-name").alphanum({ allow: '`~!@#$%^&*()_+|-=<>?:",./;\'\\{}[]', allowSpace: false });
    $(".user-email").alphanum({ allow: '!@#$%&\'*+-/=?^_`{|}~.', allowSpace: false });
    $(".alphabet").alphanum({ allowNumeric: false, allowSpace: false });
    
    $(".alphabetwithSpace").alphanum({ allow: '.', allowNumeric: false, allowSpace: true });

    
}