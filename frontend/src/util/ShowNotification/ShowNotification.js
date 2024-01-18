import { NotificationManager } from 'react-notifications';

export function showNotificationMessage(type, message) {
  switch (type) {
    case 'info':
      NotificationManager.info(message);
      break;
    case 'success':
      NotificationManager.success(message);
      break;
    case 'warning':
      NotificationManager.warning(message);
      break;
    case 'error':
      NotificationManager.error(message);
      break;
    default:
      break;
  }
};
