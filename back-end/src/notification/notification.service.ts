/* eslint-disable prettier/prettier */
// notification.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
  private readonly fcm: admin.messaging.Messaging;

  constructor() {
    if (!admin.apps.length) {

      admin.initializeApp({
      credential: admin.credential.cert({
        projectId: 'test-project-c72ed',
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCjtBNSrOvCRz3J\nEK7i6KO1IN5vwwj2IM47ra2sYU7n1iU+PG4DrqFMR+3JKHqVOfjJt/xIBQKEj9wg\nZ6Gv7R2RO/eLO/7h1frFqhWZRwoI5I8o169871SmH6MNBkKJhsXLB445cfmjT9al\nbsljYl+dOKHDvT9E/aXO1EvwrIoRDjIOH8HM53JOOgRBGBkraRUurCzJmbuyJdpM\ngoI1ScIl350/Y5W8UeNzbEJP93Wq5b47K7k2NaXYRrj+mEhsNnLUugx+RRgq/Faj\nGHChcMjf/AWvKQd4q4UO8xtTMV7wAOmHKgUXuYE7eYoTU4Kq+qgDGFVW34CpnMu6\nIDLFOPQHAgMBAAECggEABLZVyg71OGHxmtySlDCLKdcY4BG2q9MU7K3arngcm9rT\ntp9psUxxEy+M3jn+kVYaXcAgkHgocuVrOjmRc215aOlXflgLRbfxoIf9WCyt0sS1\nhED1Kbz/7EpD2Meh2bCZ9/avNuMbgwJ01M1EGcrGotFzAp3reNJuV+5Pg02MKeJ5\nYDg+72ER620PYlji6GSNjqbk/DpcUWu+6Dd3Jv/cePnr4HCfoAL1jC9GE9EJb+yS\niGXyWmsoDmJEoA4eH50bCpTBOOry8WXkw9LQotd/mK2wS29fxCoS+ga2MjGVS9Yy\nhGYtfUCoO6nSzrCw9ksZdBMMjwd5xJEnaLy7PPXW1QKBgQDi7m04xgery2omzsQ0\nAPiNZSShw8Wb6uIkiANBKaS6yidIqphE1ZRd7mc4yyb0Eu2c7hodaPpFZEKJPAQN\n4CflV7maMKiUWxjTrKX3L9usy/dsxbUz7Yp1ElgHmiWFzKhL6/V6Q9ZNC17TLYfk\n5vSEWDCvMvWcnxcesPDglHqn6wKBgQC4rERkkvwYrbI9d7gTZuZTYPp2lUkXmR4T\nisYKOh7S/+7ENtI6W0vLyxDOv31a2zUzjowczcX/sWCHpoYXb94ne87f27wm8goq\nDI47EVon7ZNtIa140nYyGhhd5XNSVHiGdMaA/7L2zrsvVJhvsoKcjbqUA3n3CJCr\nwvDEJzvZVQKBgQCy6VE5In+nxP7Sy89KRL2xFF3WH3frXjqenJEcTc2u6nQgSUc1\ndcG8cJn238u9QDMPt3TlXP97t/jxI1z654/ss8YDt3shQ9UGBabvhE7IJCLVIeaj\noxK3DBhVHgWZQGorOUPW+ia5pU5EZjAumpuKv9DaP+3+ZjsfGlc+aDFvswKBgQC4\nRGPl+ugC8+ZDAR8ydN1j2wNvqZwKKOVi2HitIbs6DNfA/3abdhdWXOQDd/zr2Ijo\nTdcusoBblzDbieSIpD4GJbqRkh7WuXI87NRKyhCsgJk3LoB6a342leU0Y8vDHbg5\naXHcq8d2D2elXYLRCUzcS2sdX66mOOyqBlTZVNCaFQKBgQCxTnbJubTCwxBH2i2T\n2W3Wx3ewgRmcVgqw9nWdkYfkkMXt8xNhBHFhhtVbF30zqV6GfN05fxUNk53xXHAq\n6D2Wfo/C4R8RKDe4BkGlmCnivxzfuVtFhoP633wx1yYyyoBjHFFCBHWtJ4SxNBLB\nVLDMRqbxJ42arHXyUKGAuiGrPg==\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-gj9lk@test-project-c72ed.iam.gserviceaccount.com",
        }),
    });

    this.fcm = admin.messaging();
  }}

  async sendNotification(token: string, title: string, body: string) {
    const message: admin.messaging.Message = {
      token,
      notification: {
        title,
        body,
      },
    };

    try {
      await this.fcm.send(message);
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error; // Optionally handle or rethrow the error
    }
  }
}
