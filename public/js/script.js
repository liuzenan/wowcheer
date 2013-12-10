/*Define rules to parse returning JSON*/
amplify.request.decoders.envelope =
    function ( data, status, xhr, success, error ) {
        console.log(data);
        var statusCode = xhr.status;
        if (statusCode != 200) {
           error(xhr.statusText,xhr.status);
        } else if ( data.status === "success" ) {
            success( data.data );
        } else if ( data.status === "fail" || data.status === "error" ) {
            error( data.data.message, data.status );
        } else {
            error( data.data.message , "fatal" );
        }
    };