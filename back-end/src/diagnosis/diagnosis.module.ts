/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/authorization/basedRoleAccess/roles.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { DiagnosisController } from './diagnosis.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Diagnosis, DiagnosisSchema } from './diagnosis.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Diagnosis.name, schema: DiagnosisSchema }]),
    ClientsModule.register([
      {
        name:"BookingService",
        transport:Transport.TCP
      }
    ]),
    DiagnosisModule,
  ],
  exports: [MongooseModule], 

  controllers: [DiagnosisController],
  providers: [DiagnosisService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },]
})
export class DiagnosisModule {}
