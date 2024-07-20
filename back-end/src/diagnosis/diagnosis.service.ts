/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DiagnosisDto } from './DiagnosisDto/diagnosis.dto';
import { Diagnosis } from './diagnosis.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DiagnosisService {
    constructor(
        @InjectModel('Diagnosis') private readonly DiagnosisModel: Model<Diagnosis>,
        private jwtService: JwtService,
    ) {}
    async Diagnosis (diagnosisDto: DiagnosisDto): Promise<Diagnosis> {
        const Diagnosis = new this.DiagnosisModel(diagnosisDto);
        return Diagnosis.save();
      } 
}
