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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import NgswService from '../../../../shared/services/ngsw.service';
import ReceptionistCabinetComponent from './receptionist-cabinet.component';
import GuestStoreService from '../../services/store/guest.store.service';
import GuestVerificationApiService from '../../services/api/guest-verification-api.service';
import ConfigInitService from '../../../../core/authentication/config-init.service';

class ConfigServiceMock {
  init = jasmine.createSpy();

  getConfigStatic = jasmine.createSpy().and.returnValue({ VERIFICATION_CONTROLLER_BASE_URL: 'myUrl' });
}

describe('ReceptionistCabinetComponent', () => {
  let component: ReceptionistCabinetComponent;
  let fixture: ComponentFixture<ReceptionistCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceptionistCabinetComponent],
      imports: [
        HttpClientTestingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
        RouterTestingModule,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatDatepickerModule,
        MatPaginatorModule,
      ],
      providers: [
        NgswService,
        TranslateService,
        GuestStoreService,
        GuestVerificationApiService,
        { provide: ConfigInitService, useClass: ConfigServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistCabinetComponent);
    TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
