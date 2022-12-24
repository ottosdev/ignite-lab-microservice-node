import { NotificationsRepository } from '../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notification-not-found';

interface UneadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class UnreadNotification {
  constructor(private repository: NotificationsRepository) {}
  async execute(request: UneadNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.repository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.repository.save(notification);
  }
}
