// Event Listener for the Connect Button
document.addEventListener('DOMContentLoaded', function() {
    var checkConnect = document.getElementById('no-connect');
    checkConnect.addEventListener('click', function() {
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