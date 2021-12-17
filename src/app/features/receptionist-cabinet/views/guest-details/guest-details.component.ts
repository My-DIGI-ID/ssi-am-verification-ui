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

/* eslint-disable no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import GuestDetailsViewModel from '../../models/guest-details-view.model';
import GuestStoreService from '../../services/store/guest.store.service';

@Component({
  selector: 'app-guest-details',
  templateUrl: './guest-details.component.html',
  styleUrls: ['./guest-details.component.scss'],
})
export class GuestDetailsComponent implements OnInit {
  public currentGuest: GuestDetailsViewModel = {
    id: '',
    title: '',
    firstName: '',
    lastName: '',
    arriving: '',
    leaving: '',
    location: '',
    status: '',
    company: '',
    companyAddress: '',
    typeOfVisit: '',
    phoneNumber: '',
    secondPhoneNumber: '',
    licensePlateNumber: '',
    email: '',
    invitedByName: '',
    invitedByPhoneNumber: '',
    invitedByEmail: '',
  };

  private guestId: string = '';

  private viewData$: Observable<GuestDetailsViewModel[]> | undefined;

  /**
   * Creates an instance of GuestDetailsComponent, extract the guestId from the activatedRoute
   * @param {GuestStoreService} store - GuestStoreService - contains guest related functions
   * @param {Router} router - A service that provides navigation among views and URL manipulation capabilities.
   * @param {ActivatedRoute} activatedRoute - Provides access to information about a route associated with a component that is loaded in an outlet. Use to traverse the RouterState tree and extract information from nodes.
   * @memberof GuestDetailsComponent
   */
  public constructor(
    private store: GuestStoreService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.guestId = this.activatedRoute.snapshot.params.id;
  }

  /**
   * Initialize the GuestDetailsComponent: Connetcting the store, and subscribing the guestList, extract the currentGuest.
   * @memberof GuestDetailsComponent
   */
  public ngOnInit(): void {
    this.viewData$ = this.store.connect();

    this.viewData$.subscribe((guestList) => {
      guestList.forEach((guest) => {
        if (guest?.id === this.guestId) {
          this.currentGuest = guest;
        }
      });
    });
  }

  /**
   * Going to the Receptionist dashboard
   * @memberof GuestDetailsComponent
   */
  public goToReceptionistCabinet(): void {
    this.router.navigateByUrl('/receptionist-cabinet');
  }
}
