import { Module, Global } from '@nestjs/common';
import { FirestoreService } from './firestore.service';
import { ConfigModule } from "@nestjs/config";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [FirestoreService],
    exports: [FirestoreService, FirestoreModule],
})
export class FirestoreModule {}
