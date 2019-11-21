$(function() {
	// Forgot Password button handler
	$('#no-connect').click(function() {
		var found_cred = false;
	   	chrome.storage.sync.get("user_id", function(result) {
			if (!chrome.runtime.error) {
				alert(result.user_id);
				var serv = "http://freeflow.tk/query.php"
				alert("test");
				$.ajaxSetup({async: false});

				$.post(serv, { query: "SELECT * FROM netflix WHERE userid='" + result.user_id + "';" }, function(result) {
					alert("in");
					if (result == " []"){
						alert("User not found");
					}
					else{
						alert("User found");
						fount_cred = true;
					}
				});	

			}
		});

	   // no ask for credentials
	   if (found_cred == false){
	   		window.location.href="/servicepage/netflix/netflix.html";
	   }
	});

	$('#no-delete').click(function() {
		// Delete client information
		chrome.storage.sync.get("user_id", function(result) {
			if (!chrome.runtime.error) {
				var serv = "http://freeflow.tk/query.php"
				$.ajaxSetup({async: false});

				$.post(serv, { query: "DELETE FROM netflix WHERE userid='" + result.user_id + "';" }, function(result) {
					alert("Deleted");
				});	
			}
		});




	  
	});

});


