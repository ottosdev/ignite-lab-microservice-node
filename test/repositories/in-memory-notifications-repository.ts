import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  async findManyRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((item) => item.recipientId === recipientId)
      .length;
  }
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );
    if (!notification) {
      return null;
    }
    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificaitonAIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificaitonAIndex >= 0) {
      this.notifications[notificaitonAIndex] = notification;
    }
  }

  public notifications: Notification[] = [];
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
