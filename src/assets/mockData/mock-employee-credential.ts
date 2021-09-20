import EmployeeCredentialApiModel from 'src/app/features/receptionist-cabinet/models/employee-credential-api.model';

export default class MockEmployeeCredential extends EmployeeCredentialApiModel {
  static createMockEmployeeCredential(): EmployeeCredentialApiModel {
    const mockEmployeeCredential: EmployeeCredentialApiModel = new EmployeeCredentialApiModel();
    mockEmployeeCredential.firstName = 'Berry';
    mockEmployeeCredential.lastName = 'Anonymous';
    mockEmployeeCredential.id = '1';

    return mockEmployeeCredential;
  }
}
