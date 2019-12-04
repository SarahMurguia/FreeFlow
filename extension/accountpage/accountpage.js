// Event Listener for Logging out
document.addEventListener('DOMContentLoaded', function() {
    var checkLogOut = document.getElementById('ap-logout');
    checkLogOut.addEventListener('click', function() {
        // TODO: Link Proper Terms of Service Document
        window.location.href="/startpage/popup.html";
        chrome.browserAction.setPopup({popup: "/startpage/popup.html"});
    }, false);
}, false);


// Event Listener for the Delete Account
document.addEventListener('DOMContentLoaded', function() {
    var checkDelete = document.getElementById('ap-delete');
    checkDelete.addEventListener('click', function() {
    	if (confirm("Confirm Account Deletion. This is permanent")) {
            // TODO: remove login from database
            chrome.storage.sync.get("user_id", function (result) {
                var serv = "http://freeflow.tk/query.php";

                $.ajaxSetup({async:false});
                $.post(serv, {query: "DELETE FROM netflix WHERE userid='" + result.user_id + "';"}, function() {
                });
                $.post(serv, {query: "DELETE FROM hulu WHERE userid='" + result.user_id + "';"}, function() {
                });
                $.post(serv, {query: "DELETE FROM hbo WHERE userid='" + result.user_id + "';"}, function() {
                });
                $.post(serv, {query: "DELETE FROM users WHERE userid='" + result.user_id + "';"}, function() {
                });
            });

            window.location.href="/startpage/popup.html";
            chrome.browserAction.setPopup({popup: "/startpage/popup.html"});
	    } 
        else {
            window.location.href="/accountpage/accountpage.html";
    	}
    }, false);
}, false);


// Event Listener for Managing Household
document.addEventListener('DOMContentLoaded', function() {
    var checkHousehold = document.getElementById('ap-house');
    checkHousehold.addEventListener('click', function() {
        window.location.href="/householdpage/household.html";
    }, false);
}, false);


// Event Listener for Changing Password
document.addEventListener('DOMContentLoaded', function() {
    var checkPass = document.getElementById('ap-changepass');
    checkPass.addEventListener('click', function() {
        window.location.href="/passpage/pass.html";
    }, false);
}, false);


// Event Listener for viewing Terms of Service
document.addEventListener('DOMContentLoaded', function() {
    var checkToS = document.getElementById('ap-tos');
    checkToS.addEventListener('click', function() {
        // TODO: Link Proper Terms of Service Document
        window.open('/docs/freeflow-tos.pdf');        
    }, false);
}, false);


// Event Listener for viewing Services Page
document.addEventListener('DOMContentLoaded', function() {
    var checkForServices = document.getElementById('ap-services');
    checkForServices.addEventListener('click', function() {
        window.location.href="/servicepage/servicepage.html";
    }, false);
}, false);

// Event Listener for Contact Us
document.addEventListener('DOMContentLoaded', function() {
    var checkForServices = document.getElementById('ap-cu');
    checkForServices.addEventListener('click', function() {
        window.open("https://forms.gle/6FrUoj5qS8ovg3uV9");
    }, false);
}, false);
