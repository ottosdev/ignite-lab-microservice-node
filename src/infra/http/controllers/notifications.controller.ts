import { GetRecipientNotifications } from './../../../application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from './../../../application/use-cases/count-notifications';
import { UnreadNotification } from './../../../application/use-cases/unread-notificaitons';
import { CancelNotification } from './../../../application/use-cases/cancel-notification';
import { SendNotification } from '@application/use-cases/send-notification';
import { NotificationDTO } from '../dto/NotificationDTO';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NotificationViewModel } from '../view-models/notification-view-models';
import { ReadNotification } from '@application/use-cases/read-notification';

@Controller('/notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Post()
  async createNotification(@Body() body: NotificationDTO) {
    const { recipientId, content, category } = body;

    const not = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });
    return {
      notification: NotificationViewModel.toHttp(not),
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });
    return { count };
  }

  @Get('from/:recipientId')
  async getFroMRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }
}
