export default class GuestCredentialApiModel {
  firstName!: string;

  lastName!: string;

  // TODO: correct to title, if the BE corrected
  titel!: string;

  email!: string;

  primaryPhoneNumber!: string;

  secondaryPhoneNumber!: string;

  companyName!: string;

  typeOfVisit!: string;

  location!: string;

  validFromDate!: string;

  validFromTime!: string;

  validUntilDate!: string;

  validUntilTime!: string;

  invitedBy!: string;

  dateOfBirth!: string;

  licensePlateNumber!: string;

  companyCity!: string;

  companyStreet!: string;

  companyPostCode!: string;

  referenceBasisId!: string;

  referenceEmployeeId!: string;
}
