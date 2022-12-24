import { IsNotEmpty } from 'class-validator';

export class NotificationDTO {
  @IsNotEmpty({
    message: 'Voce nao pode adicionar uma nova categoria sem um usaurio',
  })
  recipientId: string;
  content: string;
  category: string;
}
