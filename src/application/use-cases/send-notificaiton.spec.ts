import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const repo = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(repo);

    const notification = await sendNotification.execute({
      recipientId: 'recip-test',
      category: 'category-test',
      content: 'content-test',
    });

    expect(repo.notifications).toHaveLength(1);
    expect(repo.notifications[0]).toEqual(notification);
  });
});
