/**
 * Subset data model that represents an asset as it seen in the back-end
 * Root cause: separation of BE asset model and view model (transfer model)
 * The goal is to provide a generic way of converting and composing data structures
 * and make sure conversion logic lives in one place and is predictable.
 * Should not contain anything other than interface implementation or factory methods
 */
export default class EmployeeCredentialApiModel {
  firstName!: string; // non-null assertion operator

  lastName!: string;

  id!: string;

  email?: string;

  position?: string;

  firmName?: string;
  // WIP
}
