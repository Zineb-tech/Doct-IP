/* eslint-disable prettier/prettier */
// symptom.controller.ts
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SymptomService } from './symptom.service';
import { SymptomDto } from './SymptomDTO/symptom.dto';
//import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { RolesGuard } from 'src/authorization/basedRoleAccess/roles.guard';
 

@Controller('symptom')
@UseGuards(RolesGuard)
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Post('Symptom')
  async createSymptom(@Body() symptomDto: SymptomDto) {
    console.log('Payload received by controller:', JSON.stringify(symptomDto));
    const symptom = await this.symptomService.createSymptom(symptomDto);
    return { symptomId: symptom._id };

  }

  @Get(':patientId')
  async getSymptomsByPatientId(@Param('patientId') patientId: string) {
    console.log(`Fetching symptoms for patientId: ${patientId}`);
    const symptoms = await this.symptomService.getSymptomsByPatientId(patientId);
    console.log('Symptoms fetched:', symptoms);
    return symptoms;
  }

 


}
