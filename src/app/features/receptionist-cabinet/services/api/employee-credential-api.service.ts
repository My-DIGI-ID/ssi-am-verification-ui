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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import MockEmployeeCredential from '../../../../../assets/mockData/mock-employee-credential';
import EmployeeCredentialApiModel from '../../models/employee-credential-api.model';

/**
 * @todo - this services is not used
 * @export
 * @class EmployeeCredentialApiService
 */
@Injectable({
  providedIn: 'root',
})
export default class EmployeeCredentialApiService {
  private mockEmployeeCredential: EmployeeCredentialApiModel = MockEmployeeCredential.createMockEmployeeCredential();

  /**
   * Creates an instance of EmployeeCredentialApiService.
   * @param {HttpClient} http - Service that performs http requests.
   * @memberof EmployeeCredentialApiService
   */
  public constructor(private http: HttpClient) {}

  public httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Get employee credtentials
   * @return {Observable<EmployeeCredentialApiModel[]>} - Obserable with array of employee credentials
   * @memberof EmployeeCredentialApiService
   */
  getEmployeeCredentials(): Observable<EmployeeCredentialApiModel[]> {
    return this.http
      .get<EmployeeCredentialApiModel[]>(`placeholder`)
      .pipe(retry(1), catchError(EmployeeCredentialApiService.processError));
  }

  /**
   * Get employee credtentials based on id
   * @param {number} id
   * @return {Observable<EmployeeCredentialApiModel>}
   * @memberof EmployeeCredentialApiService
   */
  getEmployeeCredentialById(id: number): Observable<EmployeeCredentialApiModel> {
    // @FIXME: Once controller is in place remove mock
    // return this.http
    //   .get<EmployeeCredentialApiModel>(environment.endpoint + '')
    //   .pipe(retry(1), catchError(this.processError));
    if (id === 1) {
      return of(this.mockEmployeeCredential);
    }
    this.mockEmployeeCredential.firstName = 'John';
    this.mockEmployeeCredential.lastName = 'Doe';
    return of(this.mockEmployeeCredential);
  }

  private static processError(err: any): Observable<never> {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(message);
  }
}
