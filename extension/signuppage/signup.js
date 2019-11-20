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
        var good = "false";
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
                if (ret == ' []') {
					// Check username
                    $.post(serv, { query: "SELECT * FROM users WHERE username='" + user + "';" }, function(ret) {
                        if (ret == ' []') {
                            //curr_user = new User(user, pass, email);
							var pass = pass1;
                            $.post(serv, {query: "INSERT INTO users (username, email, password) VALUES ('" + user + "', '" + pass + "', '" + email + "');"}, function() {
								   good="true";

							});
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
        if (good == "true"){
            alert("test");
            window.location.href="/servicepage/servicepage.html";
            chrome.browserAction.setPopup({popup: "/servicepage/servicepage.html"});
        }
    });
});