"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conf = void 0;
require("dotenv/config");
exports.conf = {
    authFirebase: {
        email: process.env.AUTH_FIREBASE_EMAIL,
        password: process.env.AUTH_FIREBASE_PASSWORD,
    },
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
    botToken: process.env.BOT_TOKEN,
    storagePath: `${process.cwd()}/files/`,
};
