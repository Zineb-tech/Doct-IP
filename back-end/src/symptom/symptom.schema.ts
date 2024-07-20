/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class SymptomDetails {
  @Prop()
  intensity: number;

  @Prop()
  description: string;

  @Prop([String])
  symptoms: string[];

  @Prop()
  username: string;
}

export const SymptomDetailsSchema = SchemaFactory.createForClass(SymptomDetails);

@Schema()
export class Symptom extends Document {
  @Prop(raw({ type: Map, of: SymptomDetailsSchema }))
  bodyParts: Map<string, SymptomDetails>;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'booking' })
  bookingId: Types.ObjectId;



}

export const SymptomSchema = SchemaFactory.createForClass(Symptom);
