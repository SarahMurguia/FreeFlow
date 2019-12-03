$(function() {
	var serv = 'http://freeflow.tk/query.php',
		alertval = '',
		input = {
			'email': '',
			'username': '',
			'pass-1': '',
			'pass-2': ''
		},
		valid = {
			'email': false,
			'username': false,
			'pass': false
		};
	
	// Modal alert
	function malert(title, body) {
		if (title != '')
			$('.modal-title').text(title);
		$('.modal-body').html(body);
		$('#modal').modal('toggle');
	}
	
	// Enable/Disable submit button
	function smbtn(col, stat) {
		valid[col] = stat;
		if (stat)
			alertval = '';
		else
			alertval = input[col];
		if (valid['email'] && valid['username'] && valid['pass'])
			$('#su-enter').prop('disabled', false);
		else $('#su-enter').prop('disabled', true);
	}
	
	// Verify Credential
	function verify(col) {
		if (alertval != input[col]) { // To prevent multiple alert with the same value
			if (col == 'pass-2') {
				if (input['pass-1'] == '')
					malert('', "Password can't be empty")
				else if (input['pass-1'] == input['pass-2'])
					smbtn('pass', true);
				else {
					malert('', "Password do not match!")
					$('#pass-2').val('');
					smbtn('pass', false);
				}
			} else {
				if (input[col] != '')
					$.post(serv, {
						query: "SELECT userid FROM users WHERE " + col + " = '" + input[col] + "';"
					}, function(ret) {
						if (ret == ' []')
							smbtn(col, true);
						else {
							malert('', input[col] + " already exist!");
							$('#modal').modal('toggle');
							$('#' + col).val('');
							smbtn(col, false);
						}
					});
				else smbtn(col, false);
			}
		}
	}
	
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
	
	/******************** VALIDATION ********************/
	// Save input everytime user input and verify password everytime length match
	$('input').on('input', function() {
		smbtn(this.id, false);
		input[this.id] = this.value;
		if (this.id == 'pass-1')
			$('#pass-2').val('');
		else if (this.id == 'pass-2') {
			var p1 = input['pass-1'], p2 = input['pass-2'];
			if (p1.length <= p2.length)
				verify(this.id);
		}
	})
	
	// Check email or user with database if exist
	$('input').focusout(function() {
		if (this.id.split('-')[0] != 'pass')
			verify(this.id);
	})

	// Submit form
    $('#su-enter').click(function() {
		$.post(serv, {
			query: "INSERT INTO users (username, email, password) VALUES ('" + input['username'] + "', '" + input['email'] + "', '" + input['pass-1'] + "');"
		});
		$('.close').hide();
		$('#modal').modal({backdrop: 'static', keyboard: false});
		malert("Sign-up", "Submitting information. Please wait...");
		setTimeout(function () {
			window.location.href="/servicepage/servicepage.html";
			chrome.browserAction.setPopup({popup: "/servicepage/servicepage.html"});
    	}, 3000);
    });
});