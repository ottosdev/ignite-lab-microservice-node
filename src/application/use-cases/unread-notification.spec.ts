import { UnreadNotification } from './unread-notificaitons';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Read Notification', () => {
  it('should be able to unread a notification', async () => {
    const repo = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(repo);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await repo.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(repo.notifications[0].readAt).toBeNull();
  });

  it('should be able to unread a non notification', async () => {
    const repo = new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(repo);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notificaiton-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
