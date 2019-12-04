$(function() {
	// Modal alert
	function malert(title, body) {
		if (title != '')
			$('.modal-title').text(title);
		$('.modal-body').html(body);
		$('#modal').modal('toggle');
	}
	
	// Check if form filled to enable login button
	$('form input').keyup(function() {
		var empty = false;
		$('form input').each(function() {
			if($(this).val() == '') { empty = true; }
		});

		if (empty) { $('#login').prop('disabled', true); }
		else { $('#login').prop('disabled', false); }
	});
	
	// Handle enter key pressed in any input
	$('form input').keypress(function(e) {
		if (e.keyCode == 13) {
			var empty = false;
			$('form input').each(function() {
				if($(this).val() == '') { empty = true; }
			});
			
			if (!empty) { $('#login').click() }
		}
	});
	
	// Forget button handler
	$('#forgotpass').click(function() {
		window.open("https://forms.gle/3xJTPG9t1Vxc5CbV7");
	});

	// Login button handler
	$('#login').click(function() {

		// Get form value
		var user = $('#user').val().trim(),
			pass = $('#pass').val().trim();	// password converted into md5
		$.ajaxSetup({async: false});

        var serv = "http://freeflow.tk/query.php"

		// Credential verification
		$.post(serv, { query: "SELECT * FROM users WHERE username='" + user + "';" }, function(ret) {
			if (ret == ' []')
				malert('', "Username not found!");
			else {
				var obj = JSON.parse(ret);
				var line = obj[0];	

				if (line.username == user && line.password == pass) {
					chrome.storage.sync.set({ "user_id" : line.userid}, function() {
						if (chrome.runtime.error) {
						  console.log("Runtime error.");
						}
					});
					window.location ='/servicepage/servicepage.html';
					chrome.browserAction.setPopup({popup: "/servicepage/servicepage.html"});
				}		
				else malert('', "Password is incorrect!");
			}
		});
		

	});
});