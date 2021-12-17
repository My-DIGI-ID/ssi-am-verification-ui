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

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import AppComponent from './app.component';
import HeaderComponent from './header/header.component';

const userLoggedIn: boolean = true;
const userProfile: KeycloakProfile = {};

const keycloakServiceMock = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: (): void => {},
  loadUserProfile: (): Promise<KeycloakProfile> =>
    new Promise((resolve) => {
      resolve(userProfile);
    }),
  getUsername: (): string => 'mock keycloak user',
  isLoggedIn: (): Promise<boolean> =>
    new Promise((resolve) => {
      resolve(userLoggedIn);
    }),
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatToolbarModule, MatIconModule, TranslateModule.forRoot()],
      declarations: [AppComponent, HeaderComponent],
      providers: [TranslateService, { provide: KeycloakService, useValue: keycloakServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.inject(TranslateService);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ssi-am-verification-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ssi-am-verification-ui');
  });
});
