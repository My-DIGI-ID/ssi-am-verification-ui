/*
 * Copyright 2021 Bundesrepublik Deutschland
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import NgswService from './shared/services/ngsw.service';
import TranslationHttpLoader from './shared/i18n/translation-http-loader';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import environment from '../environments/environment';
import HeaderComponent from './header/header.component';
import AuthenticationModule from './core/authentication/authentication.module';
import ConfigInitService from './core/authentication/config-init.service';

export function HttpLoaderFactory(http: HttpClient, configService: ConfigInitService) {
  return new TranslationHttpLoader(http, configService);
}
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, ConfigInitService],
      },
    }),
    MatToolbarModule,
    MatIconModule,
    AuthenticationModule,
  ],
  providers: [NgswService, TranslatePipe],
  bootstrap: [AppComponent],
})
export default class AppModule {}
