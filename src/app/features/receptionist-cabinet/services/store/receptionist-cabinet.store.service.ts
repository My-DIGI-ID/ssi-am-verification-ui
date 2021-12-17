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
import { map, take } from 'rxjs/operators';
import AbstractStore from 'src/app/shared/abstractions/store.abstract';
import EmployeeCredentialApiModel from '../../models/employee-credential-api.model';
import EmployeeCredentialViewModel from '../../models/employee-credential-view.model';
import EmployeeCredentialApiService from '../api/employee-credential-api.service';

/**
 * Class representing the ReceptionistCabinetStoreService
 * @export
 * @class ReceptionistCabinetStoreService
 * @extends {AbstractStore<EmployeeCredentialViewModel[]>}
 */
@Injectable({
  providedIn: 'root',
})
export default class ReceptionistCabinetStoreService extends AbstractStore<EmployeeCredentialViewModel[]> {
  /**
   * Creates an instance of ReceptionistCabinetStoreService.
   * @param {EmployeeCredentialApiService} employeeApiService - contains employee related functions, which is connecting to the BE
   * @memberof ReceptionistCabinetStoreService
   */
  public constructor(private employeeApiService: EmployeeCredentialApiService) {
    super();
  }

  /**
   * @todo - refactor, because it is not used
   * @protected
   * @return {Observable<EmployeeCredentialModel>} - viewModel which should be used in the receptionst view
   * @memberof ReceptionistCabinetStoreService
   */
  protected buildStore(): any {
    return this.employeeApiService
      .getEmployeeCredentials()
      .pipe(
        map((apiModel: EmployeeCredentialApiModel[]) =>
          apiModel.map((EmployeeCredentialModel) =>
            Object.assign(new EmployeeCredentialViewModel(), EmployeeCredentialModel)
          )
        )
      );
  }

  /**
   * @refactor - this function is not used
   * @param {number} id - employeeId
   * @memberof ReceptionistCabinetStoreService
   */
  public fetchEmployeeFromScan(id: number): void {
    const subscribable = this.employeeApiService.getEmployeeCredentialById(id).pipe(take(1));

    subscribable.subscribe((apiModel: EmployeeCredentialApiModel) => {
      this.storeSubject.next([Object.assign(new EmployeeCredentialViewModel(), apiModel)]);
    });
  }
}
