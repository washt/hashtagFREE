if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('notificationServiceWorker.js').then(function() {
    return navigator.serviceWorker.ready;
  }).then(function(reg) {
    reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
      var matches = sub.endpoint.match(/.*\/(.*)/);
      if (matches !== null) {
        $.ajax({
          url:"/addListener",
          method:"POST",
          data:{
            listener: matches[1]
          }
        });
      }
    });
  });
}

$(function() {
  $('#create').click(function() {
    $.ajax({
      url: "/createEvent",
      method: "POST",
      data: {
        name: $("#eventName").val(),
        description: $("#eventDescription").val(),
        datetime: $("#eventDate").val() + ' ' + $("#eventTime").val(),
        // time: $("#eventTime").val(),
        location: $("#eventLocation").val()
      },
      success: function(data) {
        console.log(data)
      }
    });
  });
});
