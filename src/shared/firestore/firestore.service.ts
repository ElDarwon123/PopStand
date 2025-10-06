import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { getApps, initializeApp } from 'firebase-admin/app';

@Injectable()
export class FirestoreService {
    private readonly logger = new Logger(FirestoreService.name);
    private db: admin.firestore.Firestore;

    constructor(private readonly configService: ConfigService) {
        
        const firestoreConfig = {
            projectId: configService.get<string>('PROJECT_ID'),
            privateKey: configService.get<string>('PRIVATE_KEY')?.replace(/\\n/g, '\n'),
            clientEmail: configService.get<string>('CLIENT_EMAIL'),
        };          

        if (!getApps().length) {
            initializeApp({
                credential: admin.credential.cert(firestoreConfig),
            });
            this.logger.log('Firebase Admin initialized successfully');
        }

        this.db = admin.firestore();
    }

    getFirestore(): admin.firestore.Firestore {
        return this.db;
    }
}