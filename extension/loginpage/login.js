/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-invalid-this */
/* eslint-disable lines-around-comment */
$( function() {
  // Modal alert
  // eslint-disable-next-line require-jsdoc
  function malert( title, body ) {
    if ( title !== '' ) {
      $( '.modal-title' ).text( title );
    }
    $( '.modal-body' ).html( body );
    $( '#modal' ).modal( 'toggle' );
  }

  // Check if form filled to enable login button
  $( 'form input' ).keyup( function() {
    let empty = false;
    $( 'form input' ).each( function() {
      if ( $( this ).val() === '' ) {
        empty = true;
      }
    } );

    if ( empty ) {
      $( '#login' ).prop( 'disabled', true );
    } else {
      $( '#login' ).prop( 'disabled', false );
    }
  } );

  // Handle enter key pressed in any input
  $( 'form input' ).keypress( function( e ) {
    if ( e.keyCode === 13 ) {
      let empty = false;
      $( 'form input' ).each( function() {
        if ( $( this ).val() === '' ) {
          empty = true;
        }
      } );

      if ( !empty ) {
        $( '#login' ).click();
      }
    }
  } );

  // Forget button handler
  $( '#forgotpass' ).click( function() {
    window.open( 'https://forms.gle/3xJTPG9t1Vxc5CbV7' );
  } );

  // Login button handler
  $( '#login' ).click( function() {
    // Get form value
    const user = $( '#user' ).val().trim();
    const pass = $( '#pass' ).val().trim();	// password converted into md5
    $.ajaxSetup( { async: false } );

    const serv = 'http://freeflow.tk/query.php';
    // eslint-disable-next-line no-undef
    const hashedpass = md5( pass );


    // Credential verification
    $.post( serv, { query: 'SELECT * FROM users WHERE username=\'' +
		user + '\';' }, function( ret ) {
      if ( ret === ' []' ) {
        malert( '', 'Username not found!' );
      } else {
        const obj = JSON.parse( ret );
        const line = obj[ 0 ];

        if ( line.username === user && line.password === hashedpass ) {
          chrome.storage.sync.set( { 'user_id': line.userid }, function() {
            if ( chrome.runtime.error ) {
						  console.log( 'Runtime error.' );
            }
          } );
		  window.location = '/servicepage/servicepage.html';
		  // eslint-disable-next-line max-len
          chrome.browserAction.setPopup( { popup: '/servicepage/servicepage.html' } );
        } else malert( '', 'Password is incorrect!' );
      }
    } );
  } );
} );
