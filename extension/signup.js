document.addEventListener('DOMContentLoaded', function() {
    var completeSignUp = document.getElementById("su-enter");

    completeSignUp.addEventListener('click', function() {
        enterOk = "false";
        // Get entered input
        var email = document.getElementById("su-email").value.indexOf("@");
        var username = document.getElementById("su-name").value;
        var pass1 = document.getElementById("su-pass1").value;
        var pass2 = document.getElementById("su-pass2").value;

        // TODO: Need to some add this info to the database
        if (pass1 == pass2){
            enterOk = "true"
        }
   
        if (enterOk == "true"){
            window.location.href="servicepage.html";
        }
        else{
            alert("Passwords dont match!");
        }

    }, false);
}, false);

