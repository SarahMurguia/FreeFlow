$(function() {
	// Forgot Password button handler
	$('#h-connect').click(function() {
		var found_cred = false;
	   	chrome.storage.sync.get("user_id", function(result) {
			if (!chrome.runtime.error) {
				var serv = "http://freeflow.tk/query.php"
				$.ajaxSetup({async: false});
				$.post(serv, { query: "SELECT * FROM hulu WHERE userid='" + result.user_id + "';" }, function(result) {
					if (result == " []"){
						alert("Hulu Credentials Needed");
						window.location.href="/servicepage/hulu/hulu.html";
					}
					else{
						fount_cred = true;
						chrome.storage.sync.set({ "hulu_active" : "true"}, function() {
							if (chrome.runtime.error) {
								console.log("Runtime error.");
							}
							var login = JSON.parse(result);
							var email = login[0].service_email;	
							var pass = login[0].service_password; 
							chrome.tabs.executeScript({
								code: 'var email = ' + JSON.stringify(email) + ';var pass = ' + JSON.stringify(pass) + ';'
							}, function() {
								chrome.tabs.executeScript({file: "/servicepage/hulu/hulu_tab.js"});
							});
						});
						window.location.href="/servicepage/servicepage.html";
					}
				});	

			}
		});

	});

	$('#h-delete').click(function() {
		// Delete client information
		chrome.storage.sync.get("user_id", function(result) {
			if (!chrome.runtime.error) {
				var serv = "http://freeflow.tk/query.php"
				$.ajaxSetup({async: false});

				$.post(serv, { query: "DELETE FROM hulu WHERE userid='" + result.user_id + "';" }, function(result) {
					alert("Deleted");
				});	
			}
		});

		chrome.storage.sync.set({ "hulu_active" : "false"}, function() {
			if (chrome.runtime.error) {
				console.log("Runtime error.");
			}

		});
		window.location.href="/servicepage/servicepage.html";
	});

});


