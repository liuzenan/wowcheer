amplify.request.define( "project", "ajax", {
    url: "/api/project/{id}",
    dataType: "json",
    type: "GET",
    cache: "persist",
    decoder: "envelope"
});

$(document).ready(function() {
    amplify.request( "project",
    {
        id:$('#main-content').attr('data-id')
    },
    function( data ) {
      console.log(data);
    }
);
});