import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './ui/material/material.module';
import {CoreModule} from './core/core.module';
import {NewFeaturesDialogModule} from './ui/new-features-dialog/new-features-dialog.module';
import {environment} from '../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';

/**
 * Imports of app module
 */
export const AppImports = [
  AppRoutingModule,
  BrowserAnimationsModule,
  BrowserModule,
  FormsModule,
  HttpClientModule,

  MaterialModule,

  // Core service
  CoreModule,

  NewFeaturesDialogModule,

  // Progressive Web App
  ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
];
