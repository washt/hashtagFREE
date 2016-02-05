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
  $('#submit').click(function() {
    $.ajax({
      url: "/createEvent",
      method: "POST",
      data: {
        name: $("#name").val(),
        description: $("#description").val(),
        datetime: $("#datetime").val(),
        location: $("#location").val(),
        tags: $("#tags").val()
      },
      success: function(data) {
        console.log(data)
      }
    });
  });
});
