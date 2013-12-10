amplify.request.define( "project", "ajax", {
    url: "/api/project/{id}",
    dataType: "json",
    type: "GET",
    cache: "persist",
    decoder: "envelope"
});

amplify.request.define( "project_booking", "ajax", {
    url: "/api/project/{id}/bookings",
    dataType: "json",
    type: "POST",
    cache: "persist",
    decoder: "envelope"
});



$(document).ready(function() { 
    var markup = '<tr class="booking-price-entry" rank="${rank}" data="${price}"><td data="${price}">${price}</td><td data="${discount}">${discount}</td><td data= "${number}">${number}</td><td data="${total}">${total}</td></tr>';
    $.template( "bookingTemplate", markup );
    
    // Booking confirm
    $('#booking-confirm-btn').click(function(){
        if ($('a.price-btn.active').length <= 0) {
           window.alert("请选择票价");
           return;
        } 
        var r=confirm("确认购票吗?");
        if (r==true) {
          var tickets = [];
          var entries = $('a.price-btn.active');
         
          for (var i =0;i<entries.length;i++) {
            var entry = $(entries[i]);
            tickets.push({ticket_price:entry.attr('data'),ticket_count:1});
          }
          console.log(tickets);
          var id = $("#main-content").attr('data-id');
          
          amplify.request({
            resourceId: "project_booking",
            data : {
                  id:id,
                  tickets: tickets
            },
            success: function(data){
              window.alert("购票成功");
              location.reload();
            },
            error: function(message,status){
              if (status === 401) {
                 var res=confirm("您还没有登录.现在去登录吗?");
                 if (res) {
                  window.location.href="/login?backurl="+encodeURIComponent(window.location.href);
                }
              } else {
                  window.alert(message);
              }
            }  
          });
        } 
    })
    var discount = parseFloat($("#booking-model dd.booking-discount").attr('data'));
    console.log(discount);
    $('#booking-btn').click(function (e) {
      $('#booking-model').modal();
      return false;
    });
    $('#simplemodal-overlay').click(function(e){
         $.modal.close();
    });
    
    $('a.price-btn').click(function(){
      var price = parseFloat($(this).attr('data'));
      var priceRank = $(this).attr('rank');
      var entryTotal = 1 * discount * price;
        
      if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        var data =  {
              price: price,
              discount: discount,
              number: 1,
              total: entryTotal,
              rank:priceRank
        };
        $.tmpl( "bookingTemplate", data).prependTo( "#booking-summary" );
        var newTotal = parseFloat($("#booking-summary").attr('data')) + entryTotal;
        $("#booking-summary td.total").html(newTotal);
        $("#booking-summary").attr('data',newTotal);
      } else {
        $(this).removeClass('active');
        $("tr.booking-price-entry[rank='" +priceRank+"']").remove();
        var newTotal = parseFloat($("#booking-summary").attr('data')) - entryTotal;
        $("#booking-summary td.total").html(newTotal);
        $("#booking-summary").attr('data',newTotal);
      }
    });
});