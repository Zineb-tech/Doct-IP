/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Booking } from './booking.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { BookingDto } from './BookingDto/booking.dto';
import { Symptom } from 'src/symptom/symptom.schema';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name) private BookingModel: Model<Booking>,
        @InjectModel('Symptom') private readonly symptomModel: Model<Symptom>,
        private jwtService: JwtService,
    ) {}
     async Booking (bookingDto: BookingDto): Promise<Booking> {
        const Booking = new this.BookingModel(bookingDto);
        return Booking.save();
      }  
    async findAll(): Promise<Booking[]> {
        return this.BookingModel.find().exec();
    }
    async findByDoctorId(doctorId: string): Promise<Booking[]> {
        return this.BookingModel.find({ doctorId }).exec();
    }
    async getSymptomsByBookingId(bookingId: string): Promise<Symptom[]> {
        const booking = await this.BookingModel.findById(bookingId).exec();
        if (!booking) {
          throw new NotFoundException(`No booking found for bookingId: ${bookingId}`);
        }
    
        const symptomIds = booking.symptomId; // Assuming symptomId is an array or single ID
        const symptoms = await this.symptomModel.find({ _id: { $in: symptomIds } }).exec();
    
        if (!symptoms || symptoms.length === 0) {
          throw new NotFoundException(`No symptoms found for bookingId: ${bookingId}`);
        }
    
        return symptoms;
      }
    
 

}
