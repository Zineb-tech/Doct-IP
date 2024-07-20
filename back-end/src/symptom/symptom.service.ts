/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { SymptomDto } from './SymptomDTO/symptom.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Symptom } from './symptom.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SymptomService {
    constructor(
        @InjectModel(Symptom.name) private SymptomModel: Model<Symptom>,

        private jwtService: JwtService,
    ) {}
     
    async createSymptom(symptomDto: SymptomDto): Promise<Symptom> {
        const createdSymptom = new this.SymptomModel(symptomDto);
        return createdSymptom.save();
      }
  
    async getSymptomsByPatientId(patientId: string): Promise<Symptom[]> {
        try {
          const symptoms = await this.SymptomModel.find({ patientId }).exec();
          return symptoms;
        } catch (error) {
          console.error('Error fetching symptoms from database:', error);
          throw error;
        }
      }
    
      
    
    


       
    
}
