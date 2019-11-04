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
				if (id == -1) { $('div.modal-body').text("Invalid password"); }
				else { $('div.modal-body').text("Username '" + user + "' does not exist"); }
				$('#modal').modal('show');
			}

			// Success
			else {
				window.location ='/servicepage/servicepage.html';
			}

		// Connect failed
		}).fail(function(xhr, status, error) {
			alert(xhr.responseText);				
		});
	});
});