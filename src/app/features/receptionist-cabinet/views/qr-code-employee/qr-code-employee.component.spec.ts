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

/* eslint-disable dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QRCodeComponent } from 'angularx-qrcode';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import ConfigInitService from '../../../../core/authentication/config-init.service';
import { QrCodeEmployeeComponent } from './qr-code-employee.component';
import Spy = jasmine.Spy;
import { TranslateModule, TranslateService } from '@ngx-translate/core';

class ConfigServiceMock {
  init = jasmine.createSpy();

  getConfigStatic = jasmine.createSpy().and.returnValue({ AVERIFICATION_CONTROLLER_BASE_URL: 'myUrl' });
}

describe('HeaderComponent', () => {
  let component: QrCodeEmployeeComponent;
  let fixture: ComponentFixture<QrCodeEmployeeComponent>;
  let routerSpy: Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeEmployeeComponent, QRCodeComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule.forRoot(),
      ],
      providers: [{ provide: ConfigInitService, useClass: ConfigServiceMock }, TranslateService],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(QrCodeEmployeeComponent);
    component = fixture.componentInstance;
    routerSpy = spyOn(component['router'], 'navigateByUrl');

    fixture.detectChanges();
  });

  it('instance should be successfully created', () => {
    expect(component).toBeTruthy();
  });

  it(`if I call the 'goToReceptionistCabinet' function, I should be taken to the /receptionist-cabinet page`, () => {
    component.goToReceptionistCabinet();

    expect(routerSpy).toHaveBeenCalledOnceWith('/receptionist-cabinet');
  });
});
