/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './AuthDTO/auth.dto';
import { Auth } from './auth.schema';
import { JwtService } from '@nestjs/jwt';
import { User } from './interfaces/User.interface';
import { Booking } from 'src/booking/booking.schema';

@Injectable()
export class AuthService {
   

    constructor(
        @InjectModel(Auth.name) private authModel: Model<Auth>,
        @InjectModel(Booking.name) private bookingModel: Model<Booking>,

        private jwtService: JwtService ) {}
    /*async signUp(user: User){
        const newUser = new this.signUpModel({
            username:user.username,
            email:user.email,
            password: await bcrypt.hash(user.password,10),
        })
        try{
            await newUser.save();
        }
        catch(error){
            console.log(error) 
        }
    }*/
    async signUp(user: AuthDto): Promise<void> {
        const { username, email, password, role, speciality, phoneNumber, location } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.authModel({
            username,
            email,
            password: hashedPassword,
            role,
            speciality,
            phoneNumber,
            location

        });
       
        try {
            await newUser.save();

        } catch (error) {
            throw new HttpException('Failed to sign up user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      
    }

    async signIn(signInDto: AuthDto): Promise<{access_token: string, role:string}> {
        const { email, password } = signInDto;
        const user = await this.authModel.findOne({ email }).exec();
        
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const areEqual = await bcrypt.compare(password, user.password);
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        const payload = { sub: user.id };
        
        return { 
            access_token: await this.jwtService.signAsync(payload),
            role: user.role 
        };

    }

    async pwdReset(signInDto: AuthDto): Promise<{ message: string }> {
        const { email, password, newPassword } = signInDto;

        const user = await this.authModel.findOne({ email }).exec();
       
        if(!user){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        return { message: "Password reset successful" };
    }
    async getDoctorProfile(doctorId: string): Promise<any> {
        try {
          const doctor = await this.authModel.findById(doctorId).populate('bookings').exec();
          if (!doctor) {
            throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
          }
      
          const populatedDoctor = doctor.toObject() as any;
          const bookings = populatedDoctor.bookings as Booking[];
      
          return {
            username: doctor.username,
            email: doctor.email,
            phoneNumber: doctor.phoneNumber,
            speciality: doctor.speciality,
            location: doctor.location,
            bookings: bookings.map(booking => ({
              date: booking.date,
              username: booking.username,
            })),
          };
        } catch (error) {
          throw new HttpException('Failed to retrieve doctor profile', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      

    

    async getUserDetails(id: string, token: string): Promise<User> {
        try {
            const decodedToken = this.jwtService.verify(token);
            console.log("decoded token", decodedToken);
    
            const userId = decodedToken.sub;
            console.log("userid", userId);
    
            const user = await this.authModel.findById(userId).exec();
            
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return {
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,  
                speciality: user.speciality,
                userId: user._id.toString(),

 

            };
        } catch (error) {
            throw new HttpException('Failed to retrieve user details', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
  
    async findDoctors(): Promise<User[]> {
        try {
            const doctors = await this.authModel.find({ role: 'Doctor' }).exec();
            return doctors.map(user => ({
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                speciality: user.speciality,
                location: user.location,
                userId: user._id.toString(),
            }));
        } catch (error) {
            throw new HttpException('Failed to retrieve doctors', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    

 
}
