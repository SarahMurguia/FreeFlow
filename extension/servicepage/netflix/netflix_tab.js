function addEmailLetter(i) {
    setTimeout(function() {document.getElementById('id_userLoginId').value += email.charAt(i);}, i*9 + 300);
}
function addPassLetter(i, max) {
    setTimeout(function() {document.getElementById('id_password').value += email.charAt(i);}, i*9 + max*12 + 300);
}


document.getElementById('id_userLoginId').value = '';
document.getElementById('id_password').value = '';

for (var i = 0; i < email.length; i++) {
    addEmailLetter(i);
}
for (var i = 0; i < email.length; i++) {
    addPassLetter(i, email.length);
}

document.getElementById('bxid_rememberMe_true').value = false;