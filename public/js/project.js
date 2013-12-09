amplify.request.define( "project", "ajax", {
    url: "/api/project/{id}",
    dataType: "json",
    type: "GET",
    cache: "persist",
    decoder: "envelope"
});

$(document).ready(function() {
    $('#booking-btn').click(function (e) {
      $('#booking-model').modal();
      return false;
    });
    $('#simplemodal-overlay').click(function(e){
         $.modal.close();
    });
});