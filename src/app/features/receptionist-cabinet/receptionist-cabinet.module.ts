import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { QRCodeModule } from 'angularx-qrcode';
import ReceptionistCabinetRoutingModule from './receptionist-cabinet-routing.module';
import EmployeeCredentialApiService from './services/api/employee-credential-api.service';
import ReceptionistCabinetStoreService from './services/store/receptionist-cabinet.store.service';
import ReceptionistCabinetComponent from './views/receptionist-cabinet/receptionist-cabinet.component';
import EmployeeCardComponent from './components/employee-card/employee-card.component';
import { QrCodeComponent } from './views/qr-code/qr-code.component';
import { GuestDetailsComponent } from './views/guest-details/guest-details.component';

@NgModule({
  declarations: [ReceptionistCabinetComponent, EmployeeCardComponent, QrCodeComponent, GuestDetailsComponent],
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
  ],
  providers: [ReceptionistCabinetStoreService, EmployeeCredentialApiService],
})
export default class ReceptionistCabinetModule {}
