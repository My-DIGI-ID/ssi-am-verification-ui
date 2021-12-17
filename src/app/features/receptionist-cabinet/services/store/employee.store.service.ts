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

/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import ConfigInitService from '../../../../core/authentication/config-init.service';
import AbstractStore from '../../../../shared/abstractions/store.abstract';
import EmployeeDashboardViewModel from '../../models/employee-dashboard-view.model';
import EmployeeVerificationApiModel from '../../models/employee-verification-api.model';
import EmployeeVerificationApiService from '../api/employee-verification-api.service';

/**
 * Class representing the EmployeeStoreService
 * @export
 * @class EmployeeStoreService
 * @extends {AbstractStore<EmployeeDashboardViewModel[]>}
 */
@Injectable({
  providedIn: 'root',
})
export default class EmployeeStoreService extends AbstractStore<EmployeeDashboardViewModel[]> {
  /**
   * Creates an instance of EmployeeStoreService.
   * @param {EmployeeVerificationApiService} employeeVerificationApiService - contains employee verification related functions
   * @param {Router} router - A service that provides navigation among views and URL manipulation capabilities.
   * @param {ConfigInitService} configServie - Service that retrieves the application configuration.
   * @memberof EmployeeStoreService
   */
  public constructor(
    private employeeVerificationApiService: EmployeeVerificationApiService,
    private router: Router,
    private readonly configServie: ConfigInitService
  ) {
    super();
  }

  /**
   * Instantiates the store: calling the getAllEmployees and converting the apiModel to the viewModel
   * @protected
   * @return {any} - viewModel which is used in the employeeDashboard
   * @memberof EmployeeStoreService
   */
  protected buildStore(): any {
    return this.employeeVerificationApiService
      .getAllEmployees()
      .pipe(map((apiModel: EmployeeVerificationApiModel[]) => this.mapEmployeeApiModelToViewModelArray(apiModel)));
  }

  /**
   * Get all employee function
   * @return {Observable<EmployeeDashboardViewModel[]>}
   * @memberof EmployeeStoreService
   */
  public getAllEmployees(): Observable<EmployeeDashboardViewModel[]> {
    return this.employeeVerificationApiService
      .getAllEmployees()
      .pipe(map((apiModel: EmployeeVerificationApiModel[]) => this.mapEmployeeApiModelToViewModelArray(apiModel)));
  }

  private mapEmployeeApiModelToViewModelArray(apiModel: any[]): EmployeeDashboardViewModel[] {
    return apiModel.map((employee) => {
      const employeeView = {
        id: employee.id,
        employeeId: employee.employeeCredential.employeeId,
        firstName: employee.employeeCredential.firstName,
        lastName: employee.employeeCredential.lastName,
        location: this.getLocation(),
        status: employee.state,
        updated: this.calucalteCheckInAgo(employee.checkInDateTime),
      };

      return employeeView;
    });
  }

  private getLocation(): string {
    return this.configServie.getConfigStatic().LOCATION_ID;
  }

  private calucalteCheckInAgo(isoString: any): string {
    const inputDateTime = new Date(isoString);
    const today = new Date();
    const difference = +today - +inputDateTime;
    const minuteAgo = Math.floor(difference / 1000 / 60);

    if (minuteAgo < 60) {
      return `${minuteAgo.toString()} min`;
    }

    const hourAgo = Math.floor(minuteAgo / 60);
    if (hourAgo < 24) {
      return `${hourAgo.toString()} h`;
    }
    const dayAgo = Math.floor(hourAgo / 24);

    return `${dayAgo.toString()} day`;
  }
}
