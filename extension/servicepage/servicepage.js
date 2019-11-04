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
    	alert("netflix");
    	if (netflixCheck.classList.contains("activated") == false){
    		netflixCheck.classList.add("activated");
    	}

    }, false);
}, false);

// Hulu Listener
document.addEventListener('DOMContentLoaded', function() {
    var huluCheck = document.getElementById('sp-hulu');
    huluCheck.addEventListener('click', function() {
        alert("hulu");
        if (huluCheck.classList.contains("activated") == false){
    		huluCheck.classList.add("activated");
    	}
    }, false);
}, false);


// HBO Listener
document.addEventListener('DOMContentLoaded', function() {
    var hboCheck = document.getElementById('sp-hbo');

    hboCheck.addEventListener('click', function() {
        alert("hbo");
        if (hboCheck.classList.contains("activated") == false){
    		hboCheck.classList.add("activated");
    	}

    }, false);
}, false);