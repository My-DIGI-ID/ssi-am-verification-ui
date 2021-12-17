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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeEmployeeComponent } from './views/qr-code-employee/qr-code-employee.component';
import { GuestDetailsComponent } from './views/guest-details/guest-details.component';
import AuthenticationGuard from '../../core/authentication/authentication.guard';
import ReceptionistCabinetComponent from './views/receptionist-cabinet/receptionist-cabinet.component';
import { ReceptionistCabinetEmployeeComponent } from './views/receptionist-cabinet-employee/receptionist-cabinet-employee.component';
import { QrCodeGuestComponent } from './views/qr-code-guest/qr-code-guest.component';

const routes: Routes = [
  {
    path: 'qr-code/guest',
    component: QrCodeGuestComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: ['controlling-authority'] },
  },
  {
    path: 'qr-code/employee',
    component: QrCodeEmployeeComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: ['controlling-authority'] },
  },
  {
    path: 'guest-details/:id',
    component: GuestDetailsComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: ['controlling-authority'] },
  },
  {
    path: 'employee',
    component: ReceptionistCabinetEmployeeComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: ['controlling-authority'] },
  },
  {
    path: '',
    component: ReceptionistCabinetComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: ['controlling-authority'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class ReceptionistCabinetRoutingModule {}
