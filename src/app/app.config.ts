import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

// ⚠️ IMPORTANT: عدّل المسار حسب مكان environment عندك
import { environment } from './core/env/environment';
export const appConfig: ApplicationConfig = {
  providers: [

    // Angular performance
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Router
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    ),

    // HTTP
    provideHttpClient(withFetch()),

    // Firebase App init
    provideFirebaseApp(() =>
      initializeApp(environment.firebase)
    ),

    // Firebase Auth
    provideAuth(() => getAuth())

  ]
};
