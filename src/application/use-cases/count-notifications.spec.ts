import { CountRecipientNotifications } from './count-notifications';
import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';

describe('Count Recipient Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const repo = new InMemoryNotificationsRepository();
    const countNotification = new CountRecipientNotifications(repo);

    await repo.create(
      new Notification({
        category: 'social',
        content: new Content('There is a new notification for you.'),
        recipientId: 'example-recipient-id',
      }),
    );

    await repo.create(
      new Notification({
        category: 'social',
        content: new Content('There is a new notification for you.'),
        recipientId: 'example-recipient-id',
      }),
    );
    await repo.create(
      new Notification({
        category: 'social',
        content: new Content('There is a new notification for you.'),
        recipientId: 'example-recipient-id2',
      }),
    );

    const { count } = await countNotification.execute({
      recipeintId: 'example-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
