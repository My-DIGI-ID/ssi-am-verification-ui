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

  private store: GuestStoreService;

  public constructor(
    private _store: GuestStoreService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.guestId = this.activatedRoute.snapshot.params.id;
    this.store = _store;
  }

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

  public goToGuestQrCode(): void {
    this.router.navigate(['receptionist-cabinet/qr-code', 'guest']);
  }

  public goToReceptionistCabinet(): void {
    this.router.navigateByUrl('/receptionist-cabinet');
  }
}
