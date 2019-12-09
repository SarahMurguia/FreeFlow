/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable lines-around-comment */
$( function() {
  // Forgot Password button handler
  $( '#h-connect' ).click( function() {
	   	chrome.storage.sync.get( 'user_id', function( result ) {
      if ( !chrome.runtime.error ) {
        const serv = 'http://freeflow.tk/query.php';
        $.ajaxSetup( { async: false } );
        $.post( serv, { query: 'SELECT * FROM hulu WHERE userid=\'' +
			result.user_id + '\';' }, function( result ) {
          if ( result === ' []' ) {
            alert( 'Hulu Credentials Needed' );
            window.location.href = '/servicepage/hulu/hulu.html';
          } else {
            chrome.storage.sync.set( { 'hulu_active': 'true' }, function() {
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
                chrome.tabs.executeScript( { file: '/servicepage/hulu/hulu_tab.js' } );
              } );
            } );
            window.location.href = '/servicepage/servicepage.html';
          }
        } );
      }
    } );
  } );

  $( '#h-delete' ).click( function() {
    // Delete client information
    chrome.storage.sync.get( 'user_id', function( result ) {
      if ( !chrome.runtime.error ) {
        const serv = 'http://freeflow.tk/query.php';
        $.ajaxSetup( { async: false } );

        $.post( serv, { query: 'DELETE FROM hulu WHERE userid=\'' +
			result.user_id + '\';' }, function( result ) {
          alert( 'Deleted' );
        } );
      }
    } );

    chrome.storage.sync.set( { 'hulu_active': 'false' }, function() {
      if ( chrome.runtime.error ) {
        console.log( 'Runtime error.' );
      }
    } );
    window.location.href = '/servicepage/servicepage.html';
  } );
} );


