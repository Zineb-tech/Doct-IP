/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './BookingDto/booking.dto';

@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService

    ){}
    @Post('/booking')
    async Booking(@Body() bookingDto: BookingDto) {
        console.log('Payload received by controller:', JSON.stringify(bookingDto));
        await this.bookingService.Booking(bookingDto);
    }
 
    @Get('appointment/:doctorId')
    async getDoctorAppointments(@Param('doctorId') doctorId: string) {
        return this.bookingService.findByDoctorId(doctorId);
    }
    @Get('booking/:bookingId')
    async getSymptomsByBookingId(@Param('bookingId') bookingId: string) {
      console.log(`Fetching symptoms for bookingId: ${bookingId}`);
      const symptoms = await this.bookingService.getSymptomsByBookingId(bookingId);
      console.log('Symptoms fetched:', symptoms);
      return symptoms;
    }
  

   

      
  
}
