document.addEventListener('DOMContentLoaded', function() {
    var checkSignUp = document.getElementById('signup');
    // onClick's logic below:
    checkSignUp.addEventListener('click', function() {
        alert("Got it");
        window.location.href="signup.html";
    }, false);
}, false);

