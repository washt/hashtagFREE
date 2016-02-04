self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('push', function(event) {
  var title = 'Push message';

  event.waitUntil(
    self.registration.showNotification('# Free', {
      'body': 'New Free Stuff',
      'icon': 'images/pizza.png'
    }));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = 'https://www.hashtagfree.xyz';
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
