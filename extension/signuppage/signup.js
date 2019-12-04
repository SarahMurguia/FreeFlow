$(function() {
	var serv = 'http://freeflow.tk/query.php',
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
		if (!stat)
			input[col] = '';
		if (valid['email'] && valid['username'] && valid['pass'])
			$('#su-enter').prop('disabled', false);
		else $('#su-enter').prop('disabled', true);
	}
	
	// Verify Credential
	function verify(col) {
		if (col == 'pass-2') {
			if (input['pass-1'] == '')
				malert('', "Password can't be empty")
			else if (input['pass-1'] == input['pass-2'])
				smbtn('pass', true);
			else {
				malert('', "Password does not match!")
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
						malert('', input[col] + " have been used!");
						$('#' + col).val('');
						smbtn(col, false);
					}
				});
			else smbtn(col, false);
		}
	}
	
	// Enter keypress handler
	$('input').keypress(function(e) {
		if (!$('#su-enter').is(':disabled') && e.keyCode == 13)
			$('#su-enter').click();
	})
	
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
		var pass = md5(input['pass-1']);
		$.post(serv, {
			query: "INSERT INTO users (username, email, password) VALUES ('" + input['username'] + "', '" + input['email'] + "', '" + pass + "');"
		});
		$('.close').hide();
		$('#modal').modal({backdrop: 'static', keyboard: false});
		malert("Sign-up", "Submitting information. Please wait...");
		setTimeout(function () {
			$.post(serv, {
				query: "SELECT userid FROM users WHERE username = '" + input['username'] + "';"
			}, function(ret) {
				if (ret == ' []') {
					$('.close').show();
					$('#modal').modal({backdrop: true, keyboard: true});
					malert("Alert", "Something wrong! Please try again...");
				} else {
					var obj = JSON.parse(ret);
					var line = obj[0];
					chrome.storage.sync.set({ "user_id" : line.userid}, function() {
						if (chrome.runtime.error) {
						  console.log("Runtime error.");
						}
					});
					window.location ='/servicepage/servicepage.html';
					chrome.browserAction.setPopup({popup: "/servicepage/servicepage.html"});
				}
			})
    	}, 3000);
    });
});