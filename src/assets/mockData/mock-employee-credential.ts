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
