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
import { Observable, interval } from 'rxjs';
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import AbstractStore from '../../../../shared/abstractions/store.abstract';
import GuestVerificationApiService from '../api/guest-verification-api.service';
import VerificationApiModel from '../../models/verification-api.model';
import GuestDetailsViewModel from '../../models/guest-details-view.model';

/**
 * Class representing the GuestStoreService
 * @export
 * @class GuestStoreService
 * @extends {AbstractStore<GuestDetailsViewModel[]>}
 */
@Injectable({
  providedIn: 'root',
})
export default class GuestStoreService extends AbstractStore<GuestDetailsViewModel[]> {
  /**
   * Creates an instance of GuestStoreService.
   * @param {GuestVerificationApiService} guestVerificationApiService - guestVerificationApiService - contains guest related functions
   * @memberof GuestStoreService
   */
  public constructor(private guestVerificationApiService: GuestVerificationApiService) {
    super();
  }

  /**
   * Instantiates the store: calling the getAllGuests and converting the apiModel to the viewModel
   * @todo - refactor
   * @protected
   * @return {Observable<GuestDetailsViewModel[]>} - viewModel which is used in the guestView
   * @memberof GuestStoreService
   */
  protected buildStore(): any {
    return this.guestVerificationApiService
      .getAllGuests()
      .pipe(map((apiModel: VerificationApiModel[]) => this.mapGuestApiModelToViewModelArray(apiModel)));
  }

  /**
   * Pulling mechanism, which is doing a query every 10000 second.
   * @param {string} action - which should be stop, or something else string
   * @memberof GuestStoreService
   */
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

  /**
   * Get all guests function
   * @return {*}  {Observable<GuestDetailsViewModel[]>} - calling the getAllGuests and converting the apiModel to the viewModel
   * @memberof GuestStoreService
   */
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
        status: guest.state,
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
}
