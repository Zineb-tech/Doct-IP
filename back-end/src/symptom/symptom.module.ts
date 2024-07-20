/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SymptomController } from './symptom.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Symptom, SymptomSchema } from './symptom.schema';
import { SymptomService } from './symptom.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/authorization/basedRoleAccess/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Symptom.name, schema: SymptomSchema }]),
    ClientsModule.register([
      {
        name:"AuthService",
        transport:Transport.TCP
      }
    ]),
  ],
  exports: [MongooseModule],

  controllers: [SymptomController],
  providers: [SymptomService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class SymptomModule {}
