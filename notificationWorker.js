self.addEventListener('push', (event) => {
  const data = event.data.json();

  const options = {
    body: data.body,
    icon: 'design.png',
    image: 'design.png',
    bange: 'design.png',
    // data: {
    // customData: data.customData,
    // },
    // actions: [
    // {action: 'action-1', title: 'Action 1'},
    // {action: 'action-2', title: 'Action 2'},
    // ],
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
