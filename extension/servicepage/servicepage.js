document.addEventListener('DOMContentLoaded', function() {
    var toAccount = document.getElementById('sp-settings');
    // onClick's logic below:
    toAccount.addEventListener('click', function() {
        window.location.href="/accountpage/accountpage.html";
    }, false);
}, false);