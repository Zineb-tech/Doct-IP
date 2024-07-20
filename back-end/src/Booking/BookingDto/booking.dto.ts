/* eslint-disable prettier/prettier */

import { Types } from "mongoose";

export  class BookingDto{
     username: string;
     date: Date;
     doctorId: Types.ObjectId;
     symptomId: Types.ObjectId;


}