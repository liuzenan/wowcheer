/*Define rules to parse returning JSON*/
amplify.request.decoders.envelope =
    function ( data, status, xhr, success, error ) {
        if ( data.status === "success" ) {
            success( data.data );
        } else if ( data.status === "fail" || data.status === "error" ) {
            error( data.message, data.status );
        } else {
            error( data.message , "fatal" );
        }
    };