import { NotificationsRepository } from './../repositories/notifications-repository';
import { Content } from './../entities/content';
import { NotificationDTO } from 'src/infra/http/dto/NotificationDTO';
import { Notification } from '../entities/notification';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendNotification {
  constructor(private repository: NotificationsRepository) {}
  async execute(request: NotificationDTO): Promise<Notification> {
    const { recipientId, content, category } = request;

    const newContent = new Content(content);
    const notifcation = new Notification({
      recipientId,
      content: newContent,
      category,
    });

    // persist notification
    await this.repository.create(notifcation);

    return notifcation;
  }
}
