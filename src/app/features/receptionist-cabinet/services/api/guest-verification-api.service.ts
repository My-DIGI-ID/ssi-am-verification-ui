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

/* eslint-disable class-methods-use-this */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ConfigInitService from '../../../../core/authentication/config-init.service';
import VerificationApiModel from '../../models/verification-api.model';

/**
 * Class representing the Guest Verification API service
 * @export
 * @class GuestVerificationApiService
 */
@Injectable({
  providedIn: 'root',
})
export default class GuestVerificationApiService {
  public httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Creates an instance of GuestVerificationApiService.
   * @param {HttpClient} http - Service that performs http requests.
   * @param {ConfigInitService} configServie - Service that retrieves the application configuration.
   * @memberof GuestVerificationApiService
   */
  public constructor(private readonly http: HttpClient, private readonly configServie: ConfigInitService) {}

  /**
   * HTTP GET request that get all guests
   * @return {Observable<VerificationApiModel[]>} - Obserable with array of verification api model
   * @memberof GuestVerificationApiService
   */
  public getAllGuests(): Observable<VerificationApiModel[]> {
    const baseUrl = this.configServie.getConfigStatic().VERIFICATION_CONTROLLER_BASE_URL;
    const locationId = this.configServie.getConfigStatic().LOCATION_ID;
    const terminalId = this.configServie.getConfigStatic().TERMINAL_ID;

    return this.http.get<VerificationApiModel[]>(
      `${baseUrl}/api/v2/guest/verification-process-completion?locationId=${locationId}&terminalId=${terminalId}`
    );
  }
}
