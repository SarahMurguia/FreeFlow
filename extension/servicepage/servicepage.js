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

    chrome.storage.sync.get("netflix_active", function(result) {
        if (!chrome.runtime.error) {
            if (result.netflix_active == "true"){
                document.getElementById('sp-netflix').style.opacity = 1;
            }
            else{
                document.getElementById('sp-netflix').style.opacity = 0.5;
            }
        }
                    
    });

    netflixCheck.addEventListener('click', function() {
        window.location.href="netflix/netflix_options.html";

    }, true);
}, false);

// Hulu Listener
document.addEventListener('DOMContentLoaded', function() {
    var huluCheck = document.getElementById('sp-hulu');

    chrome.storage.sync.get("hulu_active", function(result) {
        if (!chrome.runtime.error) {
            if (result.hulu_active == "true"){
                document.getElementById('sp-hulu').style.opacity = 1;
            }
            else{
                document.getElementById('sp-hulu').style.opacity = 0.5;
            }
        }
                    
    });

    huluCheck.addEventListener('click', function() {
        window.location.href="hulu/hulu_options.html";
    }, false);
}, false);


// HBO Listener
document.addEventListener('DOMContentLoaded', function() {
    var hboCheck = document.getElementById('sp-hbo');

   chrome.storage.sync.get("hbo_active", function(result) {
        if (!chrome.runtime.error) {
            if (result.hbo_active == "true"){
                document.getElementById('sp-hbo').style.opacity = 1;
            }
            else{
                document.getElementById('sp-hbo').style.opacity = 0.5;
            }
        }
                    
    });

    hboCheck.addEventListener('click', function() {
        window.location.href="hbo/hbo_options.html";

    }, false);
}, false);


