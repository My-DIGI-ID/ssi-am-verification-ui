/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ConfigInitService from '../../../../core/authentication/config-init.service';

@Component({
  selector: 'app-qr-code-employee',
  templateUrl: './qr-code-employee.component.html',
  styleUrls: ['./qr-code-employee.component.scss'],
})
export class QrCodeEmployeeComponent {
  public qrData: string = '';

  public qrSize: number = 342;

  public qrMargin: number = 0;

  public constructor(private readonly router: Router, private readonly config: ConfigInitService) {
    this.qrData = this.getQRCode('1', '1');
  }

  public goToReceptionistCabinet(): void {
    this.router.navigateByUrl('/receptionist-cabinet');
  }

  private getQRCode(locationId: string, terminalId: string): string {
    return `${
      this.config.getConfigStatic().QR_CODE_BASE_URL
    }/employee/request-proof?locationId=${locationId}&terminalId=${terminalId}`;
  }
}
