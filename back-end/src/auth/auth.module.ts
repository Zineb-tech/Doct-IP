/* eslint-disable prettier/prettier */
import {  Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule} from '@nestjs/mongoose';
import { AuthSchema, Auth } from './auth.schema';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/authorization/basedRoleAccess/roles.guard';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    ClientsModule.register([
      {
        name:"AuthService",
        transport:Transport.TCP
      }
    ]),
    BookingModule, 
  ],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class AuthModule {}
