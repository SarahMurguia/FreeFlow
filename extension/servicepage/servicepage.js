// Switch to account settings
document.addEventListener('DOMContentLoaded', function() {
    var toAccount = document.getElementById('sp-settings');
    toAccount.addEventListener('click', function() {
        window.location.href="/accountpage/accountpage.html";
    }, false);
}, false);


// Netflix Listener
document.addEventListener('DOMContentLoaded', function() {
    var netflixCheck = document.getElementById('sp-netflix');
    netflixCheck.addEventListener('click', function() {
    	if (netflixCheck.classList.contains("activated") == false){
    		netflixCheck.classList.add("activated");
    	}
        // Check if info in data base
        // if yes let user log in service

        // if no let user sign up
        window.location.href="netflix/netflix.html";

    }, false);
}, false);

// Hulu Listener
document.addEventListener('DOMContentLoaded', function() {
    var huluCheck = document.getElementById('sp-hulu');
    huluCheck.addEventListener('click', function() {
        if (huluCheck.classList.contains("activated") == false){
    		huluCheck.classList.add("activated");
    	}
        // Check if info in data base
        // if yes let user log in service

        // if no let user sign up
        window.location.href="hulu/hulu.html";
    }, false);
}, false);


// HBO Listener
document.addEventListener('DOMContentLoaded', function() {
    var hboCheck = document.getElementById('sp-hbo');

    hboCheck.addEventListener('click', function() {
        if (hboCheck.classList.contains("activated") == false){
    		hboCheck.classList.add("activated");
    	}

        // Check if info in data base
        // if yes let user log in to service

        // if no let user sign up
        window.location.href="hbo/hbo.html";

    }, false);
}, false);