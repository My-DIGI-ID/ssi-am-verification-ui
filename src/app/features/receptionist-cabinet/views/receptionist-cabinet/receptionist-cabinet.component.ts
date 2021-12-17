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

/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-globals */
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UpdateAvailableEvent } from '@angular/service-worker';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import NgswService from '../../../../shared/services/ngsw.service';
import { MyDateAdapter } from '../../../../shared/utilities/date-adapter';
import GuestStoreService from '../../services/store/guest.store.service';
import GuestDetailsViewModel from '../../models/guest-details-view.model';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@Component({
  selector: 'app-receptionist-cabinet',
  templateUrl: './receptionist-cabinet.component.html',
  styleUrls: ['./receptionist-cabinet.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export default class ReceptionistCabinetComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, { static: true })
  private paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  private sort!: MatSort;

  public events: string[] = [];

  public dataSource = new MatTableDataSource<GuestDetailsViewModel>();

  public displayedColumns: string[] = [
    'firstName',
    'lastName',
    'arriving',
    'leaving',
    'invitedByName',
    'location',
    'status',
    'actionMenu',
  ];

  public activeTab: number = 0;

  public inBuilding: number = 0;

  public departed: number = 0;

  public viewData$: Observable<GuestDetailsViewModel[]> | undefined;

  public dataSourceLength!: number;

  public searchValue: string = '';

  private updateAvailableSubscription: Subscription | undefined;

  /**
   * Creates an instance of ReceptionistCabinetComponent.
   * @param {GuestStoreService} store - GuestStoreService - contains guest related functions
   * @param {NgswService} ngswService - Contains Service Worker functions
   * @param {Router} router - A service that provides navigation among views and URL manipulation capabilities.
   * @param {TranslateService} translate - A service that provides transalation
   * @memberof ReceptionistCabinetComponent
   */
  public constructor(
    private readonly store: GuestStoreService,
    private readonly ngswService: NgswService,
    private readonly router: Router,
    private translate: TranslateService
  ) {}

  /**
   * Initialize the ReceptionistCabinetComponent: Connetcting the store, and subscribing the guestList, handling the app update.
   * @memberof ReceptionistCabinetComponent
   */
  public ngOnInit(): void {
    this.subscribe();
    this.init();
    this.store.refetchGuests('');
    this.handleAppUpdates();
  }

  /**
   * Handle any additional initialization tasks, after Angular has fully initialized a component's view, refresh the pagination and sorting on the table.
   * @memberof ReceptionistCabinetComponent
   */
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Extract the searchValue from the event, and calling the refreshPage function
   * @param {Event} event - The Event interface represents an event which takes place in the DOM
   * @memberof ReceptionistCabinetComponent
   */
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue;

    this.refreshPage();
  }

  /**
   * Going to a specific guest details page
   * @param {string} guestId - Id of the guest
   * @memberof ReceptionistCabinetComponent
   */
  public goToGuestDetails(guestId: string): void {
    this.router.navigate(['receptionist-cabinet/guest-details', guestId]);
  }

  /**
   * Going to the employee dashboard page
   * @memberof ReceptionistCabinetComponent
   */
  public goToEmployeeDashboard(): void {
    this.router.navigateByUrl('receptionist-cabinet/employee');
  }

  /**
   * Push to the events array the event type and value
   * @param {string} type - it should be input, or change string
   * @param {MatDatepickerInputEvent<Date>} event - An event used for datepicker input and change events
   * @memberof ReceptionistCabinetComponent
   */
  public addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  /**
   * @todo refactor this part
   * Going to the QR Code page, based on the role
   * @param {string} role
   * @memberof ReceptionistCabinetComponent
   */
  public goToQRCode(role: string): void {
    this.router.navigate(['receptionist-cabinet/qr-code', role]);
  }

  /**
   * Active tab changes, extract the activeTab, and refresh the page
   * @param {*} e - selectedTabChange output event
   * @memberof ReceptionistCabinetComponent
   */
  public tabClick(e: any): void {
    if (e.index === 0 || e.index === 1) {
      this.activeTab = e.index;
    }

    this.refreshPage();
  }

  /**
   * Custom cleanup that needs to occur when the instance is destroyed: unsubscribe updateAvailableSubscription, and refetchGuests, clean the searchValue
   * @memberof ReceptionistCabinetComponent
   */
  public ngOnDestroy(): void {
    if (this.updateAvailableSubscription) {
      this.updateAvailableSubscription.unsubscribe();
    }
    this.store.refetchGuests('stop');
    this.searchValue = '';
  }

  private refreshPage(): void {
    this.inBuilding = this.getGuestNumber('CHECK_IN');
    this.departed = this.getGuestNumber('CHECK_OUT');

    if (this.activeTab === 0) {
      this.filterTable('CHECK_IN');
    } else {
      this.filterTable('CHECK_OUT');
    }
  }

  private filterTable(status: string) {
    this.viewData$?.subscribe((guests: GuestDetailsViewModel[]) => {
      const filteredGuests = guests.filter((item) => item.status === status);
      this.dataSource = new MatTableDataSource(filteredGuests);

      if (this.searchValue.length > 0) {
        this.dataSource.filter = this.searchValue.trim().toLowerCase();
      }

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSourceLength = this.dataSource.filteredData.length;
    });
  }

  private getGuestNumber(status: string): number {
    let count: number = 0;

    this.viewData$?.subscribe((guests: GuestDetailsViewModel[]) => {
      const filteredGuests = guests.filter((item) => item.status === status);
      count = filteredGuests.length;
    });

    return count;
  }

  private subscribe(): void {
    this.viewData$ = this.store.connect();

    this.viewData$.subscribe(() => {
      this.refreshPage();
    });
  }

  private init(): void {
    this.store.init();
  }

  private handleAppUpdates(): void {
    if (this.ngswService.isEnabled()) {
      this.updateAvailableSubscription = this.ngswService
        .isUpdateAvailable()
        .subscribe((event: UpdateAvailableEvent) => {
          if (event.available) {
            // prompt user to update
            console.log(
              this.translate.instant('receptionist-cabinet-component.app-update.current-version'),
              event.current
            );
            // available version
            console.log(
              this.translate.instant('receptionist-cabinet-component.app-update.available-version'),
              event.available
            );

            /**
             * @todo Replace with modal later on
             */
            if (confirm(this.translate.instant('receptionist-cabinet-component.app-update.want-to-update'))) {
              this.ngswService.activateUpdate().then(() => document.location.reload());
            }
          }
        });
    }
  }
}
