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

  /**
   * Creates an instance of QrCodeEmployeeComponent, calling the getQrCode function.
   * @param {Router} router - A service that provides navigation among views and URL manipulation capabilities.
   * @param {ConfigInitService} config - Service that retrieves the application configuration.
   * @memberof QrCodeEmployeeComponent
   */
  public constructor(private readonly router: Router, private readonly config: ConfigInitService) {
    this.qrData = this.getQRCode();
  }

  /**
   * Going to the Receptionist dashboard
   * @memberof QrCodeEmployeeComponent
   */
  public goToReceptionistCabinet(): void {
    this.router.navigateByUrl('/receptionist-cabinet');
  }

  private getQRCode(): string {
    const baseUrl = this.config.getConfigStatic().QR_CODE_BASE_URL;
    const locationId = this.config.getConfigStatic().LOCATION_ID;
    const terminalId = this.config.getConfigStatic().TERMINAL_ID;

    return `${baseUrl}/api/v2/employee/request-proof?locationId=${locationId}&terminalId=${terminalId}`;
  }
}
