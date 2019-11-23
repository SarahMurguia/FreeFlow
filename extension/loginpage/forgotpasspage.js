$(function() {
    // Check if form filled to enable submit button
    $('form input').keyup(function() {
        var empty = false;
        $('form input').each(function() {
            if($(this).val() == '') { empty = true; }
        });
        if (empty) { $('#passreset-enter').prop('disabled', true); }
        else { $('#passreset-enter').prop('disabled', false); }
    });

    // Handler enter key pressed in any input
    $('form input').keypress(function(e) {
        if (e.keyCode == 13) {
            var empty = false;
            $('form input').each(function() {
                if($(this).val() == '') { empty = true; }
            });

            if (!empty) { $('#login').click() }
        }
    });

    $('#passreset-enter').click(function() {
        var serv = "http://freeflow.tk/query.php";
        // Get entered input
        var email = $('#reset-email').val();
        alert('email: ' + email);

        $.ajaxSetup({async: false});
        $.post(serv, { query: "SELECT * FROM users WHERE email='" + email + "';" }, function(ret) {
            alert('ret: ' + ret);
            if(ret == ' []') {
                // User not found
                alert('User with email ' + email + ' not found');
            } else {
                // User found, must send reset password email
                alert('User found. Email sent to ' + email + ' to reset password.');
                window.location ='/loginpage/login.html';
				chrome.browserAction.setPopup({popup: "/loginpage/login.html"});
            }
        });
    });
});