/* eslint-disable prettier/prettier */
// notification.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  async sendNotification(@Body() notificationData: { token: string; title: string; body: string }) {
    const { token, title, body } = notificationData;
    await this.notificationService.sendNotification(token,title,body)
    return { message: 'Notification sent' };
  }
}
