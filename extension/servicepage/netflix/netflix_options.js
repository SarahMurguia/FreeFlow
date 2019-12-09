/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable lines-around-comment */
$( function() {
  // Forgot Password button handler
  $( '#no-connect' ).click( function() {
	   	chrome.storage.sync.get( 'user_id', function( result ) {
      if ( !chrome.runtime.error ) {
        const serv = 'http://freeflow.tk/query.php';
        $.ajaxSetup( { async: false } );
        $.post( serv, { query: 'SELECT * FROM netflix WHERE userid=\'' +
			result.user_id + '\';' }, function( result ) {
          if ( result === ' []' ) {
            alert( 'Netlix Credentials Needed' );
            window.location.href = '/servicepage/netflix/netflix.html';
          } else {
            chrome.storage.sync.set( { 'netflix_active': 'true' }, function() {
              if ( chrome.runtime.error ) {
                console.log( 'Runtime error.' );
              }
              const login = JSON.parse( result );
              const email = login[ 0 ].service_email;
              const pass = login[ 0 ].service_password;
              chrome.tabs.executeScript( {
                code: 'var email = ' + JSON.stringify( email ) +
					';var pass = ' + JSON.stringify( pass ) + ';',
              }, function() {
                // eslint-disable-next-line max-len
                chrome.tabs.executeScript( { file: '/servicepage/netflix/netflix_tab.js' } );
              } );
            } );

            window.location.href = '/servicepage/servicepage.html';
          }
        } );
      }
    } );
  } );

  $( '#no-delete' ).click( function() {
    // Delete client information
    chrome.storage.sync.get( 'user_id', function( result ) {
      if ( !chrome.runtime.error ) {
        const serv = 'http://freeflow.tk/query.php';
        $.ajaxSetup( { async: false } );

        $.post( serv, { query: 'DELETE FROM netflix WHERE userid=\'' +
			result.user_id + '\';' }, function( result ) {
          alert( 'Deleted' );
        } );
      }
    } );

    chrome.storage.sync.set( { 'netflix_active': 'false' }, function() {
      if ( chrome.runtime.error ) {
        console.log( 'Runtime error.' );
      }
    } );
    window.location.href = '/servicepage/servicepage.html';
  } );
} );
