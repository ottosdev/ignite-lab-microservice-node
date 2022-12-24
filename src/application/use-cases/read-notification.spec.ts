import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const repo = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(repo);

    const notification = makeNotification({
      recipientId: 'recipientId-example',
    });

    await repo.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(repo.notifications[0].readAt).toEqual(notification.readAt);
  });

  it('should be able to read a non notification', async () => {
    const repo = new InMemoryNotificationsRepository();

    const readNotification = new ReadNotification(repo);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notificaiton-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
