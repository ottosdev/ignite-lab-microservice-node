import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>; // todas as opcoes sao opcionais.

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('There is a new notification for you.'),
    recipientId: 'example-recipient-id',
    ...override,
  });
}
