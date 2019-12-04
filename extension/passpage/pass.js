document.addEventListener('DOMContentLoaded', function() {
    var completePassChange = document.getElementById("p-enter");

    completePassChange.addEventListener('click', function() {
        // Get entered input
        var currPass = document.getElementById("p-curr").value;
        var pass1 = document.getElementById("p-pass1").value;
        var pass2 = document.getElementById("p-pass2").value;

        if (pass1 == pass2){
            // TODO: Check that curr pass matches database
            chrome.storage.sync.get("user_id", function(ret1) {
                if(!chrome.runtime.error) {
                    var serv = "http://freeflow.tk/query.php"
                    $.ajaxSetup({async: false});
                    $.post(serv, { query: "SELECT password FROM users WHERE userid='" + ret1.user_id + "';"}, function(ret2) {
                        var obj = JSON.parse(ret2);
                        var password = obj[0].password;	
                        var hashedpass = md5(currPass);
                        if(password == hashedpass) {
                            chrome.storage.sync.get("user_id", function(ret3) {
                                if(!chrome.runtime.error) {
                                    $.ajaxSetup({async: false});
                                    $.post(serv, { query: "UPDATE users SET password='" + md5(pass1) +"' WHERE userid='" + ret3.user_id + "';"});
                                }
                            });

                            window.location.href="/accountpage/accountpage.html";
                       
                        } else {
                            alert("Current password does not match");
                        }
                    });
                }
            });

        }
   

        else{
            alert("New Passwords dont match!");
        }

    }, false);
}, false);