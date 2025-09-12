import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';

import { routes } from './app.routes';
import { AppService } from './app.service';
import {AuthInterceptor} from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([AuthInterceptor])),


    importProvidersFrom(BrowserAnimationsModule, ModalModule.forRoot()),

    AppService,
  ],
};
