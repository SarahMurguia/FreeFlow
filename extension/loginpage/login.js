$(function() {
	// Check if form filled to enable login button
	$('form input').keyup(function() {
		var empty = false;
		$('form input').each(function() {
			if($(this).val() == '') { empty = true; }
		});

		if (empty) { $('#login').prop('disabled', true); }
		else { $('#login').prop('disabled', false); }
	});

	// Forgot Password button handler
	$('#fpass').click(function() {
	});

	// Login button handler
	$('#login').click(function() {

		// Get form value
		var user = $('#user').val().trim(),
			pass = md5($('#pass').val().trim());	// password converted into md5

		// Credential verification
		$.post('http://freeflow.tk/login.php', {user: user, pass: pass}).done(function(ret) {
			var id = parseInt(ret);
			
			// Login failed
			if (id < 0) {
				if (id == -1) { alert("Invalid password!"); }
				else { alert("User '" + user + "' does not exist!"); }
			}

			// Success
			else {
				window.location ='/servicepage/servicepage.html';
				chrome.browserAction.setPopup({popup: '/servicepage/servicepage.html'})
			}

		// Connect failed
		}).fail(function(xhr, status, error) {
			alert(xhr.responseText);				
		});
	});
});