import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { getApps, initializeApp } from 'firebase-admin/app';

@Injectable()
export class FirestoreService {
    private readonly logger = new Logger(FirestoreService.name);
    private db: admin.firestore.Firestore;

    constructor(private configService: ConfigService) {
        try {
            const firestoreConfig = {
                projectId: this.configService.get<string>('PROJECT_ID'),
                privateKey: this.configService.get<string>('PRIVATE_KEY')?.replace(/\\n/g, '\n'),
                clientEmail: this.configService.get<string>('CLIENT_EMAIL'),
            };

            // Validar que las credenciales existan
            if (!firestoreConfig.projectId || !firestoreConfig.privateKey || !firestoreConfig.clientEmail) {
                throw new Error('Firebase credentials are missing in environment variables');
            }

            if (!getApps().length) {
                initializeApp({
                    credential: admin.credential.cert(firestoreConfig),
                });
                this.logger.log('Firebase Admin initialized successfully');
            }

            this.db = admin.firestore();
        } catch (error) {
            this.logger.error('Error initializing Firebase Admin', error);
            throw error;
        }
    }

    getFirestore(): admin.firestore.Firestore {
        return this.db;
    }
}