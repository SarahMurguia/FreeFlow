/* eslint-disable lines-around-comment */
document.addEventListener( 'DOMContentLoaded', function() {
  const completePassChange = document.getElementById( 'p-enter' );

  completePassChange.addEventListener( 'click', function() {
    // Get entered input
    const currPass = document.getElementById( 'p-curr' ).value;
    const pass1 = document.getElementById( 'p-pass1' ).value;
    const pass2 = document.getElementById( 'p-pass2' ).value;

    if ( pass1 === pass2 ) {
      // TODO: Check that curr pass matches database
      chrome.storage.sync.get( 'user_id', function( ret1 ) {
        if ( !chrome.runtime.error ) {
          const serv = 'http://freeflow.tk/query.php';
          $.ajaxSetup( { async: false } );
          $.post( serv, { query: 'SELECT password FROM users WHERE userid=\'' +
            ret1.user_id + '\';' }, function( ret2 ) {
            const obj = JSON.parse( ret2 );
            const password = obj[ 0 ].password;
            // eslint-disable-next-line no-undef
            const hashedpass = md5( currPass );
            if ( password === hashedpass ) {
              chrome.storage.sync.get( 'user_id', function( ret3 ) {
                if ( !chrome.runtime.error ) {
                  $.ajaxSetup( { async: false } );
                  $.post( serv, { query: 'UPDATE users SET password=\'' +
                    // eslint-disable-next-line no-undef
                    md5( pass1 ) + '\' WHERE userid=\'' + ret3.user_id +
                    '\';' } );
                }
              } );

              window.location.href = '/accountpage/accountpage.html';
            } else {
              alert( 'Current password does not match' );
            }
          } );
        }
      } );
    } else {
      alert( 'New Passwords dont match!' );
    }
  }, false );
}, false );
