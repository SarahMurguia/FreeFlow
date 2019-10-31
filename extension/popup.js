// Event Listener for the Sign Up Page
document.addEventListener('DOMContentLoaded', function() {
    var checkSignUp = document.getElementById('signup');
    checkSignUp.addEventListener('click', function() {
        window.location.href="signup.html";
    }, false);
}, false);

// Event Listener for the Login In Page
document.addEventListener('DOMContentLoaded', function() {
    var checkLogIn = document.getElementById('login');
    checkLogIn.addEventListener('click', function() {
        window.location.href="login.html";
    }, false);
}, false);