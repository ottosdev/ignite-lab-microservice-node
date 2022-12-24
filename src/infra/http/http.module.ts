import { GetRecipientNotifications } from './../../application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from './../../application/use-cases/count-notifications';
import { UnreadNotification } from './../../application/use-cases/unread-notificaitons';
import { ReadNotification } from './../../application/use-cases/read-notification';
import { CancelNotification } from './../../application/use-cases/cancel-notification';
import { DatabaseModule } from './../database/database.module';
import { SendNotification } from './../../application/use-cases/send-notification';
import { NotificationsController } from './controllers/notifications.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
  ],
})
export class HttpModule {}
