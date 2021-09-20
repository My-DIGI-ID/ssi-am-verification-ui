import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import AbstractStore from 'src/app/shared/abstractions/store.abstract';
import EmployeeCredentialApiModel from '../../models/employee-credential-api.model';
import EmployeeCredentialViewModel from '../../models/employee-credential-view.model';
import EmployeeCredentialApiService from '../api/employee-credential-api.service';

@Injectable({
  providedIn: 'root',
})
export default class ReceptionistCabinetStoreService extends AbstractStore<EmployeeCredentialViewModel[]> {
  private employeeApiService: EmployeeCredentialApiService;

  constructor(private _employeeApiService: EmployeeCredentialApiService) {
    super();
    this.employeeApiService = _employeeApiService;
  }

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

  fetchEmployeeFromScan(id: number): void {
    const subscribable = this.employeeApiService.getEmployeeCredentialById(id).pipe(take(1));

    subscribable.subscribe((apiModel: EmployeeCredentialApiModel) => {
      this.storeSubject.next([Object.assign(new EmployeeCredentialViewModel(), apiModel)]);
    });
  }
}
