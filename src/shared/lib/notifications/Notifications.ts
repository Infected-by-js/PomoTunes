// export class Notifications {
//   private isPermissionGranted: boolean;
//   private title: string;
//   private options: NotificationOptions;

//   constructor(
//     isPermissionGranted: boolean = false,
//     title: string = '',
//     options: NotificationOptions = {}
//   ) {
//     this.isPermissionGranted = isPermissionGranted;
//     this.title = title;
//     this.options = options;
//   }

//   public requestPermission(): void {
//     if (!('Notification' in window)) {
//       console.warn('This browser does not support desktop notifications');
//       return;
//     }

//     if (Notification.permission !== 'granted') {
//       Notification.requestPermission()
//         .then((permission) => {
//           this.isPermissionGranted = permission === 'granted';
//         })
//         .catch((error) =>
//           console.error('Error while requesting notification permission:', error)
//         );
//     } else {
//       this.isPermissionGranted = true;
//     }
//   }

//   public showNotification(title: string, options?: NotificationOptions): void {
//     if (!this.isPermissionGranted) {
//       console.warn('Notifications permission not granted');
//       return;
//     }

//     const mergedOptions: NotificationOptions = {
//       ...this.options,
//       ...options,
//     };

//     const notification = new Notification(title, mergedOptions);

//     // if (mergedOptions.onClick) {
//     //   notification.addEventListener('click', mergedOptions.onClick);
//     // }

//     // if (mergedOptions.onClose) {
//     //   notification.addEventListener('close', mergedOptions.onClose);
//     // }
//   }
// }

export class NotificationService {
  private static instance: NotificationService;
  private isPermissionGranted: boolean;

  constructor() {
    this.isPermissionGranted = false;
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public async requestPermission(): Promise<void> {
    if (!Object.hasOwn(window, 'Notification')) {
      console.warn('This browser does not support desktop notifications');
      return;
    }

    if (!this.isPermissionGranted) {
      const permission = await Notification.requestPermission();
      this.isPermissionGranted = permission === 'granted';
    }
  }

  public async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (!this.isPermissionGranted) {
      await this.requestPermission();
    }

    console.log(this);
    if (this.isPermissionGranted) {
      // const notification = new Notification(title, options);
      // if (mergedOptions.onClick) {
      //   notification.addEventListener('click', mergedOptions.onClick);
      // }

      // if (mergedOptions.onClose) {
      //   notification.addEventListener('close', mergedOptions.onClose);
      // }
      // new Notification(title, options);
      await navigator.serviceWorker.ready;
      const registration = await navigator.serviceWorker.getRegistration();
      registration.showNotification(title, options);
    }
  }
}

export const Notifications = (): NotificationService => {
  return NotificationService.getInstance();
};
