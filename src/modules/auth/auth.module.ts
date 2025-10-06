import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ClerkStrategy } from './clerk.strategy';
import { ClerkClientProvider } from './clerk-client.provider';

@Module({
    imports: [
        PassportModule,
        ConfigModule
    ],
    providers: [
        ClerkStrategy, 
        ClerkClientProvider,
    ],
    exports: [PassportModule],
})
export class AuthModule {}
