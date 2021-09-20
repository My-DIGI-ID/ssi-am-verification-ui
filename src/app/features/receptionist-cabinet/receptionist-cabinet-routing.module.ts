import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestDetailsComponent } from './views/guest-details/guest-details.component';
import AuthenticationGuard from '../../core/authentication/authentication.guard';
import ReceptionistCabinetComponent from './views/receptionist-cabinet/receptionist-cabinet.component';
import { QrCodeComponent } from './views/qr-code/qr-code.component';

const routes: Routes = [
  {
    path: 'qr-code/:id',
    component: QrCodeComponent,
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
