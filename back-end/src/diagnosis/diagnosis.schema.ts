/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Diagnosis extends Document {

 
  @Prop()
  patientId: string;

  @Prop()
  disease?: string;

  @Prop()
  description?: string;

  @Prop()
  reason?: string;

  @Prop()
  solution?: string;

  @Prop()
  labTests?: string;

  @Prop()
  additionalNotes?: string;

  @Prop()
  urgencyLevel?: string;

 



}

export const DiagnosisSchema = SchemaFactory.createForClass(Diagnosis);

