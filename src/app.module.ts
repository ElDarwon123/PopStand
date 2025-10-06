import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from './shared/firestore/firestore.module';
import { ConfigModule } from '@nestjs/config';
import { ClerkClientProvider } from './modules/auth/clerk-client.provider';
import { APP_GUARD } from '@nestjs/core';
import { ClerAuthkGuard } from './modules/auth/cleck.guard';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    FirestoreModule,
    ConfigModule.forRoot({ 
      isGlobal: true }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ClerkClientProvider,
    {
      provide: APP_GUARD,
      useClass: ClerAuthkGuard,
    },
    {    
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
