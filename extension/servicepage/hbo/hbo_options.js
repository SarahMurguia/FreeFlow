$(function() {
	// Forgot Password button handler
	$('#hb-connect').click(function() {
		var found_cred = false;
	   	chrome.storage.sync.get("user_id", function(result) {
			if (!chrome.runtime.error) {
				var serv = "http://freeflow.tk/query.php"
				$.ajaxSetup({async: false});
				$.post(serv, { query: "SELECT * FROM hbo WHERE userid='" + result.user_id + "';" }, function(result) {
					if (result == " []"){
						alert("HBO Credentials Needed");
						window.location.href="/servicepage/hbo/hbo.html";
					}
					else{
						fount_cred = true;
						chrome.storage.sync.set({ "hbo_active" : "true"}, function() {
							if (chrome.runtime.error) {
								console.log("Runtime error.");
							}

						});

						window.location.href="/servicepage/servicepage.html";
					}
				});	

			}
		});

	});

	$('#hb-delete').click(function() {
		// Delete client information
		chrome.storage.sync.get("user_id", function(result) {
			if (!chrome.runtime.error) {
				var serv = "http://freeflow.tk/query.php"
				$.ajaxSetup({async: false});

				$.post(serv, { query: "DELETE FROM hbo WHERE userid='" + result.user_id + "';" }, function(result) {
					alert("Deleted");
				});	
			}
		});

		chrome.storage.sync.set({ "hbo_active" : "false"}, function() {
			if (chrome.runtime.error) {
				console.log("Runtime error.");
			}

		});
		window.location.href="/servicepage/servicepage.html";
	});

});


