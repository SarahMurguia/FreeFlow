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
            enterOk = "true";

            // TODO: Add new info to database
        }
   
        if (enterOk == "true"){
            window.location.href="/accountpage/accountpage.html";
        }
        else{
            alert("Passwords dont match!");
        }

    }, false);
}, false);