export class NotificationService {
  private static instance: NotificationService;
  private isPermissionGranted: boolean;

  constructor() {
    this.isPermissionGranted = false;

    document.addEventListener('visibilitychange', this.clearPageVisibleNotifications);
  }

  private clearPageVisibleNotifications = async () => {
    if (document.visibilityState === 'visible') {
      const register = await navigator.serviceWorker.ready;
      const notifications = await register.getNotifications();

      notifications.forEach((notification) => notification.close());
    }
  };

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public async requestPermission() {
    if (this.isPermissionGranted) return;

    if (!Object.hasOwn(window, 'Notification')) {
      console.warn('This browser does not support desktop notifications');
      return;
    }

    const permission = await Notification.requestPermission();
    this.isPermissionGranted = permission === 'granted';
  }

  public async showNotification(title: string, options?: NotificationOptions) {
    await this.requestPermission();

    if (!this.isPermissionGranted) return;

    if (document.visibilityState !== 'visible') {
      const registration = await navigator.serviceWorker.ready;

      registration.showNotification(title, options);
    }
  }
}

export const Notifications = (): NotificationService => NotificationService.getInstance();
