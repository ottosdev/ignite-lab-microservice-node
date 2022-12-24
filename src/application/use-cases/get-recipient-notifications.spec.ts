import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Recipient Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const repo = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotifications(repo);

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

    const { notifications } = await getRecipientNotification.execute({
      recipeintId: 'example-recipient-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        (expect.objectContaining({ recipientId: 'example-recipient-id' }),
        expect.objectContaining({ recipientId: 'example-recipient-id' })),
      ]),
    );
  });
});
