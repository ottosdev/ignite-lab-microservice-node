import { NotificationsRepository } from './../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

@Injectable()
export class CancelNotification {
  constructor(private repository: NotificationsRepository) {}
  async execute(request: CancelNotificationRequest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.repository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.repository.save(notification);
  }
}
