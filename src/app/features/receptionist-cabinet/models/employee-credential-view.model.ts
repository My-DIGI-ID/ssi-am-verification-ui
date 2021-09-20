/**
 * Data model for displaying employee credential
 * Model serves as golden source of thruth for view
 */
export default class EmployeeCredentialViewModel {
  firstName!: string; // non-null assertion operator

  lastName!: string;

  id!: string;

  email?: string;

  position?: string;

  firmName?: string;
  // WIP
}
