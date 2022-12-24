import { Content } from './content';
import { Notification } from './notification';
import { randomUUID } from 'node:crypto';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('There is a new notification'),
      category: 'social',
      recipientId: randomUUID(),
      readAt: new Date(),
    });

    expect(notification).toBeTruthy();
  });
});
