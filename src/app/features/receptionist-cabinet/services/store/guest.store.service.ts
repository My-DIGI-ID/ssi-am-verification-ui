/* eslint-disable no-console */
import { Observable, interval } from 'rxjs';
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import AbstractStore from '../../../../shared/abstractions/store.abstract';
import GuestVerificationApiService from '../api/guest-verification-api.service';
import VerificationApiModel from '../../models/verification-api.model';
import GuestDetailsViewModel from '../../models/guest-details-view.model';

@Injectable({
  providedIn: 'root',
})
export default class GuestStoreService extends AbstractStore<GuestDetailsViewModel[]> {
  private guestVerificationApiService: GuestVerificationApiService;

  constructor(private _guestVerificationApiService: GuestVerificationApiService, private router: Router) {
    super();
    this.guestVerificationApiService = _guestVerificationApiService;
  }

  protected buildStore(): any {
    return this.guestVerificationApiService
      .getAllGuests()
      .pipe(map((apiModel: VerificationApiModel[]) => this.mapGuestApiModelToViewModelArray(apiModel)));
  }

  public refetchGuests(action: string): void {
    const requestInterval = interval(10000).subscribe({
      next: () =>
        this.getGuests().subscribe((guestsList) => {
          this.publish(guestsList);
        }),
      complete: () => console.log('complete'),
    });
    if (action === 'stop') {
      requestInterval.unsubscribe();
    }
  }

  public getGuests(): Observable<GuestDetailsViewModel[]> {
    return this.guestVerificationApiService
      .getAllGuests()
      .pipe(map((apiModel: VerificationApiModel[]) => this.mapGuestApiModelToViewModelArray(apiModel)));
  }

  private mapGuestApiModelToViewModelArray(apiModel: VerificationApiModel[]): GuestDetailsViewModel[] {
    return apiModel.map((guest) => {
      const guestView = {
        id: guest.id,
        title: guest.guestCredential.titel,
        firstName: guest.guestCredential.firstName,
        lastName: guest.guestCredential.lastName,
        arriving: this.getTimeFromIsoString(guest.checkInDateTime),
        leaving: this.getDepartedDateTime(guest.checkOutDateTime),
        location: guest.guestCredential.location,
        status: this.mapVisitState(guest.state),
        company: guest.guestCredential.companyName,
        companyAddress: this.getGuestCompanyAddress(
          guest.guestCredential.companyCity,
          guest.guestCredential.companyStreet
        ),
        typeOfVisit: guest.guestCredential.typeOfVisit,
        phoneNumber: guest.guestCredential.primaryPhoneNumber,
        secondPhoneNumber: guest.guestCredential.secondaryPhoneNumber,
        licensePlateNumber: guest.guestCredential.licensePlateNumber,
        email: guest.guestCredential.email,
        invitedByName: guest.guestCredential.invitedBy,
        invitedByPhoneNumber: '+31 8 1234 5678',
        invitedByEmail: 'edward@company.com',
      };

      return guestView;
    });
  }

  private getGuestCompanyAddress(city: string, street: string): string {
    return `${city}, ${street}`;
  }

  private getTimeFromIsoString(time: number | null): string {
    if (!time) {
      return '-';
    }

    const inputTime = new Date(time);

    return `${inputTime.getHours()}:${inputTime.getMinutes()}`;
  }

  private getDepartedDateTime(date_: number | null): string {
    if (!date_) {
      return '-';
    }

    const inputDate = new Date(date_);
    const dateArray = inputDate.toDateString().split(' ');

    let date = dateArray[2].concat(' ', dateArray[1], ', ');

    const today = new Date(Date.now());
    const dateTodayArray = today.toDateString().split(' ');

    if (
      dateTodayArray[1] === dateArray[1] &&
      dateTodayArray[2] === dateArray[2] &&
      dateTodayArray[3] === dateArray[3]
    ) {
      date = 'Heute, ';
    }

    return date + this.getTimeFromIsoString(date_);
  }

  private mapVisitState(apiState: string): string {
    if (apiState === 'CHECK_IN') {
      return 'In Building';
    }

    if (apiState === 'CHECK_OUT') {
      return 'Departed';
    }

    return '-';
  }
}
