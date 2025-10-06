import { Injectable, UnauthorizedException, Inject, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";
import { User, verifyToken } from "@clerk/backend";
import type { ClerkClient } from "@clerk/backend"
import { Request as req } from "express";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
    private readonly logger = new Logger(ClerkStrategy.name);
    constructor(
        @Inject('ClerkClient')
        private readonly clerkClient: ClerkClient,
        private readonly configService: ConfigService
    ) {    
        super();
    }

    async validate(req: req): Promise<User> {
        const token = req.headers.authorization?.split(' ').pop();
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const tokenPayload = await verifyToken(token, {
                secretKey: this.configService.get<string>('CLERK_SECRET_KEY'),
            })
            const user = await this.clerkClient.users.getUser(tokenPayload.sub);
            return user;
        } catch (error) {
            this.logger.error('Error verifying token or fetching user:', error);
            throw new UnauthorizedException('Invalid token');
        }
    }
}