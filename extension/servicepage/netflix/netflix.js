$(function() {
	// Check if form filled to enable enter button
	$('form input').keyup(function() {
		var empty = false;
		$('form input').each(function() {
			if($(this).val() == '') { empty = true; }
		});

		if (empty) { $('#netflix-enter').prop('disabled', true); }
		else { $('#netflix-enter').prop('disabled', false); }
	});
	
	// Handler enter key pressed in any input
	$('form input').keypress(function(e) {
		if (e.keyCode == 13) {
			var empty = false;
			$('form input').each(function() {
				if($(this).val() == '') { empty = true; }
			});
			
			if (!empty) { $('#netflix-enter').click() }
		}
	});

	 $('#netflix-enter').click(function() {
        var serv = "http://freeflow.tk/query.php"

        // Get entered input
        var email = $('#n-email').val(),
            pass = $('#n-pass').val();
		var done = false;
		$.ajaxSetup({async: false});
        // Check email
        $.post(serv, { query: "SELECT * FROM netflix WHERE email='" + email + "';" }, function(ret) {
            if (ret == ' []') {
				// Check username
                $.post(serv, { query: "SELECT * FROM netflix WHERE user='" + user + "';" }, function(ret) {
                    if (ret == ' []') {
						var pass = md5(pass1);
                        $.post(serv, {query: "INSERT INTO netflix (id, user, pass) VALUES ('" + "fakeuser" + "', '" + email + "', '" + pass + "');"}, function() {
							window.location.href="/servicepage/servicepage.html";
						});
                    } else {
                        alert('Username have been used!\n');
                    }
                });
            } else {
				alert('Email have been used!\n');
            }
        });
     
});