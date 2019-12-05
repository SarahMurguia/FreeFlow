function addEmailLetter(i) {
    setTimeout(function() {document.getElementById('email_id').value += email.charAt(i);}, i*9 + 300);
}
function addPassLetter(i, max) {
    setTimeout(function() {document.getElementById('password_id').value += pass.charAt(i);}, i*9 + max*12 + 300);
}


document.getElementById('email_id').value = '';
document.getElementById('password_id').value = '';

for (var i = 0; i < email.length; i++) {
    addEmailLetter(i);
}

for (var i = 0; i < pass.length; i++) {
    addPassLetter(i, pass.length);
}

document.getElementById('bxid_rememberMe_true').value = false;