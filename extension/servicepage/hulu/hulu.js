$(function() {
	// Check if form filled to enable login button
	$('form input').keyup(function() {
		var empty = false;
		$('form input').each(function() {
			if($(this).val() == '') { empty = true; }
		});

		if (empty) { $('#enter').prop('disabled', true); }
		else { $('#enter').prop('disabled', false); }
	});
	
	// Handler enter key pressed in any input
	$('form input').keypress(function(e) {
		if (e.keyCode == 13) {
			var empty = false;
			$('form input').each(function() {
				if($(this).val() == '') { empty = true; }
			});
			
			if (!empty) { $('#enter').click() }
		}
	});

	// Login button handler
	$('#enter').click(function() {

		// Get form value
		var acc_user = $('#enter').val().trim(),
			acc_pass = md5($('#pass').val().trim());	// password converted into md5

		// Credential verification
		$.post('http://freeflow.tk/login.php', {user: user, pass: pass}).done(function(ret) {
			var id = parseInt(ret);
			
		// TODO: Add Acc user and acc pass
		window.location ='/servicepage/servicepage.html';
		

		// Connect failed
		}).fail(function(xhr, status, error) {
			alert(xhr.responseText);				
		});
	});
});