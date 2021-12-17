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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceptionistCabinetEmployeeComponent } from './receptionist-cabinet-employee.component';
import ConfigInitService from '../../../../core/authentication/config-init.service';

class ConfigServiceMock {
  init = jasmine.createSpy();

  getConfigStatic = jasmine.createSpy().and.returnValue({ VERIFICATION_CONTROLLER_BASE_URL: 'myUrl' });
}

describe('ReceptionistCabinetEmployeeComponent', () => {
  let component: ReceptionistCabinetEmployeeComponent;
  let fixture: ComponentFixture<ReceptionistCabinetEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceptionistCabinetEmployeeComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        MatIconModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
      ],
      providers: [TranslateService, { provide: ConfigInitService, useClass: ConfigServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistCabinetEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
