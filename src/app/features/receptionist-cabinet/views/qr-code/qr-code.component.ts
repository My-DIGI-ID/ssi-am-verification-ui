/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ConfigInitService from 'src/app/core/authentication/config-init.service';

export class NgxQrCode {
  text: string = '';
}

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent {
  public qrdata: string = '';

  public qrSize: number = 360;

  public qrMargin: number = 0;

  public constructor(private readonly router: Router, private readonly config: ConfigInitService) {
    this.qrdata = `${this.config.getConfigStatic().QR_CODE_BASE_URL}/request-proof?locationId=1&terminalId=1`;
  }

  public goToReceptionistCabinet(): void {
    this.router.navigateByUrl('/receptionist-cabinet');
  }
}
