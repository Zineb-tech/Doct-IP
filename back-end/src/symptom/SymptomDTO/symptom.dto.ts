/* eslint-disable prettier/prettier */

import { Types } from "mongoose";

export class SymptomDetailsDto {
  
  intensity: number;
  description: string;
  symptoms: string[];
  username: string;

}

export class SymptomDto {
  bodyPart: Record<string, SymptomDetailsDto>;
  patientId: Types.ObjectId;

}
