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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MatPaginatorIntlGerman } from '../../shared/utilities/german-paginator-intl';
import ReceptionistCabinetRoutingModule from './receptionist-cabinet-routing.module';
import EmployeeCredentialApiService from './services/api/employee-credential-api.service';
import ReceptionistCabinetStoreService from './services/store/receptionist-cabinet.store.service';
import ReceptionistCabinetComponent from './views/receptionist-cabinet/receptionist-cabinet.component';
import EmployeeCardComponent from './components/employee-card/employee-card.component';
import { QrCodeGuestComponent } from './views/qr-code-guest/qr-code-guest.component';
import { GuestDetailsComponent } from './views/guest-details/guest-details.component';
import { QrCodeEmployeeComponent } from './views/qr-code-employee/qr-code-employee.component';
import { ReceptionistCabinetEmployeeComponent } from './views/receptionist-cabinet-employee/receptionist-cabinet-employee.component';

@NgModule({
  declarations: [
    ReceptionistCabinetComponent,
    EmployeeCardComponent,
    QrCodeGuestComponent,
    QrCodeEmployeeComponent,
    GuestDetailsComponent,
    ReceptionistCabinetEmployeeComponent,
  ],
  imports: [
    CommonModule,
    ReceptionistCabinetRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    QRCodeModule,
    TranslateModule,
  ],
  providers: [
    ReceptionistCabinetStoreService,
    EmployeeCredentialApiService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlGerman },
    TranslatePipe,
  ],
})
export default class ReceptionistCabinetModule {}
