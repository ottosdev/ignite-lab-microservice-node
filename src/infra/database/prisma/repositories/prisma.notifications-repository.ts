import { PrismaNotificationMapper } from './../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from '../../../../application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findManyRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId },
    });

    return notifications.map((notification) =>
      PrismaNotificationMapper.toDomain(notification),
    );
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { recipientId },
    });

    return count;
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });
    return PrismaNotificationMapper.toDomain(notification);
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({
      data: raw,
    });
  }
}
