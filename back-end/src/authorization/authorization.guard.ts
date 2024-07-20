/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authToken = request.headers.authorization;

        if (!authToken) {
            throw new UnauthorizedException('Please provide a token');
        }

        const tokenParts = authToken.split(' ');

        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
            throw new UnauthorizedException('Invalid token format');
        }

        const token = tokenParts[1];

        try {
            const decodedToken = this.jwtService.verify(token);
            console.log('Decoded Token Payload:', decodedToken);

            const userId = decodedToken.sub;

            request.user = { id: userId };

            return true;
        } catch (error) {
            console.error('Token verification error:', error.message);
            throw new UnauthorizedException('Invalid token');
        }
    }
}
