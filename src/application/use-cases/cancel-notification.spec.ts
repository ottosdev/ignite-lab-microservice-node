import { makeNotification } from '@test/factories/notification-factory';
import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const repo = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(repo);

    const notification = makeNotification({
      recipientId: 'recipientId-example',
    });

    await repo.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(repo.notifications[0].canceledAt).toEqual(notification.canceledAt);
  });

  it('should be able to cancel a non notification', async () => {
    const repo = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(repo);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notificaiton-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
