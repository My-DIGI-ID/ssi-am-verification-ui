/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ConfigInitService from '../../../../core/authentication/config-init.service';

export class NgxQrCode {
  text: string = '';
}

@Component({
  selector: 'app-qr-code-employee',
  templateUrl: './qr-code-employee.component.html',
  styleUrls: ['./qr-code-employee.component.scss'],
})
export class QrCodeEmployeeComponent {
  public qrData: string = '';

  public qrSize: number = 360;

  public qrMargin: number = 0;

  public constructor(private readonly router: Router, private readonly config: ConfigInitService) {
    this.qrData = `${this.config.getConfigStatic().QR_CODE_BASE_URL}/employee/request-proof?locationId=1&terminalId=1`;
  }

  public goToReceptionistCabinet(): void {
    this.router.navigateByUrl('/receptionist-cabinet');
  }
}
