/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Booking, BookingSchema } from './booking.schema';
import { BookingService } from './booking.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/authorization/basedRoleAccess/roles.guard';
import { SymptomModule } from 'src/symptom/symptom.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    ClientsModule.register([
      {
        name:"BookingService",
        transport:Transport.TCP
      }
    ]),
    SymptomModule,
  ],
  exports: [MongooseModule], 

  controllers: [BookingController],
  providers: [BookingService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class BookingModule {}
