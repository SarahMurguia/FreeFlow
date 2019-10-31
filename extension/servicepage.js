document.addEventListener('DOMContentLoaded', function() {
    var toAccount = document.getElementById('sp-settings');
    // onClick's logic below:
    toAccount.addEventListener('click', function() {
    	alert("in here");
        window.location.href="accountpage.html";
    }, false);
}, false);