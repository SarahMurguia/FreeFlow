document.addEventListener('DOMContentLoaded', function() {
    var completePassChange = document.getElementById("p-enter");

    completePassChange.addEventListener('click', function() {
        enterOk = "false";
        // Get entered input
        var currPass = document.getElementById("p-curr").value;
        var pass1 = document.getElementById("p-pass1").value;
        var pass2 = document.getElementById("p-pass2").value;

        if (pass1 == pass2){
            // TODO: Check that curr pass matches database
            chrome.storage.sync.get("user_id", function(result) {
                if(!chrome.runtime.error) {
                    var serv = "http://freeflow.tk/query.php"
                    $.ajaxSetup({async: false});

                    $.post(serv, { query: "SELECT password FROM users WHERE userid='" + result.user_id + "';"}, function(result) {
                        var obj = JSON.parse(result);
                        var password = obj[0].password;	
                        if(password == currPass) {
                            alert("Current password matches: " + password + " " + currPass);
                        } else {
                            alert("Current password does not match: " + password + " " + currPass);
                        }
                    });
                }
            });
            alert("enterOk set to true");
            enterOk = "true";
        }
   
        if (enterOk == "true"){
            alert("enterOk = true");
            chrome.storage.sync.get("user_id", function(result) {
                if(!chrome.runtime.error) {
                    alert("is this working");
                    var serv = "http://freeflow.tk/query.php"
                    $.ajaxSetup({async: false});

                    $.post(serv, { query: "UPDATE users SET password='" + pass1 +"' WHERE userid='" + user_id + "';"});
                    alert("password updated");
                }
            });
            window.location.href="/accountpage/accountpage.html";
        }
        else{
            alert("Passwords dont match!");
        }

    }, false);
}, false);