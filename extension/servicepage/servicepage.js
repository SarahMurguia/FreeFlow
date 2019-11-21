// Switch to account settings
document.addEventListener('DOMContentLoaded', function() {
    var toAccount = document.getElementById('sp-settings');
    toAccount.addEventListener('click', function() {
        window.location.href="/accountpage/accountpage.html";
    }, false);
}, false);


// Netflix Listener
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get("netflix_active", function(result) {
        var netflixCheck = document.getElementById('sp-netflix');

        if (!chrome.runtime.error) {
            if (result.netflix_active == "true"){

                alert("active");
                netflixCheck.classList.add("activated");
                document.getElementById('sp-netflix').style.opacity = 1;
            }
            else{

                alert("not active");
                netflixCheck.classList.delete("activated");
                document.getElementById('sp-netflix').style.opacity = 0.5;
            }
        }
                    
    });
    var netflixCheck = document.getElementById('sp-netflix');
    netflixCheck.addEventListener('click', function() {
        alert("normal");
        
        // Check if info in data base
        // if yes let user log in service

        // if no let user sign up
        window.location.href="netflix/netflix_options.html";

    }, true);
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

