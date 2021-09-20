import BasisIdApiModel from './basis-id-api.model';
import GuestCredentialApiModel from './guest-credential-api.model';

export default class VerificationApiModel {
  id!: string;

  basisId!: BasisIdApiModel;

  guestCredential!: GuestCredentialApiModel;

  checkOutDateTime!: number | null;

  checkInDateTime!: number | null;

  state!: string;
}
