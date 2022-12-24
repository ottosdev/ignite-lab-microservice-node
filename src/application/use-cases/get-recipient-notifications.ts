import { NotificationsRepository } from './../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private repository: NotificationsRepository) {}
  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications = await this.repository.findManyRecipientId(
      recipientId,
    );

    return {
      notifications,
    };
  }
}
