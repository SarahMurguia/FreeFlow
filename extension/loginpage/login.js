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

	// Forgot Password button handler
	$('#fpass').click(function() {
	});

	// Login button handler
	$('#login').click(function() {

		// Get form value
		var user = $('#user').val().trim(),
			pass = $('#pass').val().trim();	// password converted into md5
        var serv = "http://freeflow.tk/query.php"

		// Credential verification
		$.post('http://freeflow.tk/users.php', {username: user, password: pass}).done(function(ret) {
			var id = parseInt(ret);
			
			// Login failed
			if (id < 0) {
				if (id == -1) { $('div.modal-body').text("Invalid password"); }
				else { $('div.modal-body').text("Username '" + user + "' does not exist"); }
				$('#modal').modal('show');
			}

			// Success
			else {
				$.post(serv, { query: "SELECT userid FROM users WHERE username='" + user + "';" }, function(userid) {
                    var obj = JSON.parse(userid);
                    var tempid = obj[0].userid;
                    alert(tempid);
			
					
					chrome.storage.sync.set({ "user_id" : tempid}, function() {
					    if (chrome.runtime.error) {
					      console.log("Runtime error.");
					    }

					});
      
					window.location ='/servicepage/servicepage.html';
					chrome.browserAction.setPopup({popup: "/servicepage/servicepage.html"});
				});
			}

		// Connect failed
		}).fail(function(xhr, status, error) {
			alert(xhr.responseText);				
		});
	});
});