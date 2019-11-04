$(function() {
    // Check if form filled to enable login button
    $('form input').keyup(function() {
        var empty = false;
        $('form input').each(function() {
            if($(this).val() == '') { empty = true; }
        });
        if (empty) { $('#su-enter').prop('disabled', true); }
        else { $('#su-enter').prop('disabled', false); }
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

    $('#su-enter').click(function() {
        var serv = "http://freeflow.tk/query.php"
        // Get entered input
        var email = $('#su-email').val(),
            user = $('#su-name').val(),
            pass1 = $('#su-pass1').val(),
            pass2 = $('#su-pass2').val();
		var done = false;

		$.ajaxSetup({async: false});
        // Check password
        if (pass1 == pass2) {
            // Check email
            $.post(serv, { query: "SELECT * FROM users WHERE email='" + email + "';" }, function(ret) {
				alert(ret);
                if (ret == ' []') {
					// Check username
                    $.post(serv, { query: "SELECT * FROM users WHERE user='" + user + "';" }, function(ret) {
						alert(ret);
                        if (ret == ' []') {
							var pass = md5(pass1);
                            $.post(serv, {query: "INSERT INTO users (user, pass, email) VALUES ('" + user + "', '" + pass + "', '" + email + "');"}, function() {});
                            window.location.href="/servicepage/servicepage.html";
                            chrome.browserAction.setPopup({popup: "/servicepage/servicepage.html"});
                        } else {
                            alert('Username have been used!\n');
                        }
                    });
                } else {
					alert('Email have been used!\n');
                }
            });
        } else {
            alert('Password do not match!\n');
        }
    });
});