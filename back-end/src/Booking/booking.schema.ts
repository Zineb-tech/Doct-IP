/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Booking extends Document {
  @Prop()
  date: Date;

  @Prop()
  username: string;
  
  @Prop({ type: Types.ObjectId, ref: 'auths' })
  doctorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'auths' })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'symptom' })
  symptomId: Types.ObjectId;



}

export const BookingSchema = SchemaFactory.createForClass(Booking);

