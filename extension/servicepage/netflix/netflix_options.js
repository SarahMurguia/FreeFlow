// Event Listener for the Connect Button
document.addEventListener('DOMContentLoaded', function() {
    var checkConnect = document.getElementById('no-connect');
    checkConnect.addEventListener('click', function() {


    	chrome.storage.sync.get("user_id", function(result) {
			if (!chrome.runtime.error) {
				alert(result.user_id);
				var serv = "http://freeflow.tk/query.php"

				$.post(serv, { query: "SELECT * FROM netflix WHERE userid='" + result.user_id + "';" }, function(result) {
					alert("in");
					if (result == " []"){
						alert("User not found");
					}
					else{
						alert("User found");
					}
				});	

			}
		});

    	// check if info in database
    		// yess log in
 

    	// no ask for credentials
        window.location.href="/servicepage/netflix/netflix.html";
    }, false);
}, false);

// Event Listener for the Login In Page
document.addEventListener('DOMContentLoaded', function() {
    var checkDelete = document.getElementById('no-delete');
    checkDelete.addEventListener('click', function() {
    	if (confirm("Confirm Netflix Account Deletion. This is permanent")) {
            // TODO: remove Netflix info from user 
            window.location.href="/servicepage/servicepage.html";
	    } 
        else {
            window.location.href="/servicepage/netflix/netflix_options.html";
    	}
    }, false);
}, false);