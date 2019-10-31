// Event Listener for the Delete Account
document.addEventListener('DOMContentLoaded', function() {
    var checkDelete = document.getElementById('ap-delete');
    checkDelete.addEventListener('click', function() {
    	if (confirm("Confirm Account Deletion. This is permanent")) {
            // TODO: remove login from database
            window.location.href="popup.html";
            chrome.browserAction.setPopup({popup: "popup.html"});
	    } 
        else {
    	    txt = "You pressed Cancel!";
            window.location.href="accountpage.html";

    	}


    }, false);
}, false);

// Event Listener for Managing Household
document.addEventListener('DOMContentLoaded', function() {
    var checkHousehold = document.getElementById('ap-house');
    checkHousehold.addEventListener('click', function() {
        window.location.href="household.html";
    }, false);
}, false);


// Event Listener for Changing Password
document.addEventListener('DOMContentLoaded', function() {
    var checkPass = document.getElementById('ap-changepass');
    checkPass.addEventListener('click', function() {
        window.location.href="signup.html";
    }, false);
}, false);

// Event Listener for viewing Terms of Service
document.addEventListener('DOMContentLoaded', function() {
    var checkToS = document.getElementById('ap-tos');
    checkToS.addEventListener('click', function() {
        window.location.href="signup.html";
    }, false);
}, false);