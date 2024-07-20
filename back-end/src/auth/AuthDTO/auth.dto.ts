/* eslint-disable prettier/prettier */
export class AuthDto{
    readonly username:string;
    readonly email:string;
    readonly password:string;
    readonly newPassword:string;
    readonly role: string;
    phoneNumber?: string;
    speciality?: string;
    location?: string;
    userId: string;

}