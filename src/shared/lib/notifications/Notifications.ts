export class NotificationService {
  private static instance: NotificationService;
  private isPermissionGranted: boolean;
  private notifications: Notification[];

  constructor() {
    this.isPermissionGranted = false;
    this.notifications = [];

    document.addEventListener('visibilitychange', this.clearPageVisibleNotifications);
  }

  private clearPageVisibleNotifications = async () => {
    if (document.visibilityState === 'visible') {
      this.notifications.forEach((notification) => notification.close());

      this.notifications = [];
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

    if (document.visibilityState === 'hidden') {
      const notification = new Notification(title, options);

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      notification.onclose = () => {
        notification.onclick = null;
        notification.onclose = null;
      };

      this.notifications.push(notification);
    }
  }
}

export const Notifications = (): NotificationService => NotificationService.getInstance();
