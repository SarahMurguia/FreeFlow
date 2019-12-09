/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-invalid-this */
/* eslint-disable lines-around-comment */
$( function() {
  // Check if form filled to enable enter button
  $( 'form input' ).keyup( function() {
    let empty = false;
    $( 'form input' ).each( function() {
      if ( $( this ).val() === '' ) {
        empty = true;
      }
    } );

    if ( empty ) {
      $( '#hulu-enter' ).prop( 'disabled', true );
    } else {
      $( '#hulu-enter' ).prop( 'disabled', false );
    }
  } );

  // Handler enter key pressed in any input
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

  $( '#hulu-enter' ).click( function() {
   		// get user id
    chrome.storage.sync.get( 'user_id', function( result ) {
      if ( !chrome.runtime.error ) {
        const id = result.user_id;
		        const user = $( '#h-email' ).val().trim();
            		const pass = $( '#h-pass' ).val().trim();
        $.ajaxSetup( { async: false } );
        const serv = 'http://freeflow.tk/query.php';
        // eslint-disable-next-line max-len
        $.post( serv, { query: 'INSERT INTO hulu (userid, service_email, service_password) VALUES (\'' +
			id + '\', \'' + user + '\', \'' + pass + '\');' }, function() {
          window.location.href = '/servicepage/servicepage.html';
        } );

        chrome.storage.sync.set( { 'hulu_active': 'true' }, function() {
          if ( chrome.runtime.error ) {
					   	console.log( 'Runtime error.' );
          }
        } );
      }
    } );
	 } );
} );
