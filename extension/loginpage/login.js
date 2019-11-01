document.addEventListener('DOMContentLoaded', function() {
    var checkLogin = document.getElementById('login');
	// onClick's logic below:
    checkLogin.addEventListener('click', function() {
        var user = document.forms["loginForm"]["user"].value,
			pass = document.forms["loginForm"]["pass"].value;
		alert("Username: " + user + '\n' + "Password: " + pass);
		window.location.href="/servicepage/servicepage.html";
    }, false);
}, false);