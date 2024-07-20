/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';


@Schema()
export class Auth extends Document{
  @Prop({unique:true})
  username: string;

  @Prop({unique:true})
  email: string;

  @Prop({unique:true})
  password: string;

  @Prop()
  phoneNumber?: string; 

  @Prop()
  speciality?: string; 

  @Prop() 
  role: string;

  @Prop() 
  location?: string;
  
  @Prop()
  userId: string;

}
export type AuthModule = HydratedDocument<Auth>;

export const AuthSchema = SchemaFactory.createForClass(Auth);
