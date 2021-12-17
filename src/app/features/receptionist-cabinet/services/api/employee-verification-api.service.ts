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

/**
 * Class representing the Employee Verification API service
 * @export
 * @class EmployeeVerificationApiService
 */
@Injectable({
  providedIn: 'root',
})
export default class EmployeeVerificationApiService {
  public httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Creates an instance of EmployeeVerificationApiService.
   * @param {HttpClient} http - Service that performs http requests.
   * @param {ConfigInitService} configServie - Service that retrieves the application configuration.
   * @memberof EmployeeVerificationApiService
   */
  public constructor(private readonly http: HttpClient, private readonly configServie: ConfigInitService) {}

  /**
   *
   * HTTP GET request that get all employee
   * @return {Observable<any[]>} - Obserable with array of verification api model
   * @memberof EmployeeVerificationApiService
   */
  public getAllEmployees(): Observable<any[]> {
    const baseUrl = this.configServie.getConfigStatic().VERIFICATION_CONTROLLER_BASE_URL;
    const locationId = this.configServie.getConfigStatic().LOCATION_ID;
    const terminalId = this.configServie.getConfigStatic().TERMINAL_ID;

    return this.http.get<any[]>(
      `${baseUrl}/api/v2/employee/verification-process-completion?locationId=${locationId}&terminalId=${terminalId}`
    );
  }
}
