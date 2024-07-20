/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { DiagnosisDto } from './DiagnosisDto/diagnosis.dto';
import { DiagnosisService } from './diagnosis.service';

@Controller('diagnosis')
export class DiagnosisController {
    constructor(
        private readonly diagnosisService: DiagnosisService

    ){}
    @Post('/diagnosis')
    async Booking(@Body() diagnosisDto: DiagnosisDto) {
        console.log('Payload received by controller:', JSON.stringify(diagnosisDto));
        await this.diagnosisService.Diagnosis(diagnosisDto);
    }
 
}
