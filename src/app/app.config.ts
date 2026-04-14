import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [

    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    ),

    provideHttpClient(
      withFetch(),
    ),

    // Firebase
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyBRwCps9bjUWCNPV2WK3y8ElP1Bdz8zPok",
        authDomain: "market-23f05.firebaseapp.com",
        projectId: "market-23f05",
        storageBucket: "market-23f05.appspot.com",
        messagingSenderId: "674816876191",
        appId: "1:674816876191:web:306b2ebd7f09c721730caa",
        measurementId: "G-TX4WM7QCTM"
      })
    ),

    provideAuth(() => getAuth())

  ]
};
