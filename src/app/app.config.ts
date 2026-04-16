import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

// environment
import { environment } from './core/env/environment';

export const appConfig: ApplicationConfig = {
  providers: [

    // تحسين الأداء
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Router
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),

    // HTTP Client
    provideHttpClient(withFetch()),

    // Firebase App
    provideFirebaseApp(() =>
      initializeApp(environment.firebase)
    ),

    // Firebase Auth
    provideAuth(() => getAuth()),

  ]
};
