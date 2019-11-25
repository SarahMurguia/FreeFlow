function addEmailLetter(i) {
    setTimeout(function() {document.getElementById('id_userLoginId').value += email.charAt(i);}, i*9 + 300);
}
function addPassLetter(i, max) {
    setTimeout(function() {document.getElementById('id_password').value += pass.charAt(i);}, i*9 + max*12 + 300);
}


document.getElementById('id_userLoginId').value = '';
document.getElementById('id_password').value = '';

document.getElementById("id_userLoginId").className = "nfTextField hasText";
for (var i = 0; i < email.length; i++) {
    addEmailLetter(i);
}

document.getElementById("id_password").className = "nfTextField hasText";
for (var i = 0; i < pass.length; i++) {
    addPassLetter(i, pass.length);
}

document.getElementById('bxid_rememberMe_true').value = false;