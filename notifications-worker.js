self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then((clientList) => {
        const client = clientList.find((client) => client.url === self.registration.scope);
        try {
          client.focus();
        } catch (error) {
          console.log('FOCUS TAB ERROR: ', error);
        }
      })
  );
});
