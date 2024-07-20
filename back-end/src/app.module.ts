/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { SymptomModule } from './symptom/symptom.module';
import { BookingModule } from './booking/booking.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';
import { NotificationModule } from './notification/notification.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://drissikaitounizineb:UliF0r0tP1jdr6qn@cluster0.rbmka3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


    ),
    
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    SymptomModule,
    BookingModule,
    DiagnosisModule,
    NotificationModule,
  ],
  controllers: [AppController, NotificationController],
  providers: [AppService, NotificationService],
})
export class AppModule {
 
}
