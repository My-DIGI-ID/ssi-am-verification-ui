/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-globals */
import { Component, OnDestroy, OnInit, ViewChild, DoCheck } from '@angular/core';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UpdateAvailableEvent } from '@angular/service-worker';
import NgswService from '@shared/services/ngsw.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
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
export default class ReceptionistCabinetComponent implements OnInit, OnDestroy, DoCheck {
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

  public searchValue: string = '';

  private store: GuestStoreService;

  private updateAvailableSubscription: Subscription | undefined;

  private ngswService: NgswService;

  public constructor(
    private _store: GuestStoreService,
    private _ngswService: NgswService,
    private readonly router: Router
  ) {
    this.store = _store;
    this.ngswService = _ngswService;
  }

  public ngOnInit(): void {
    this.subscribe();
    this.init();

    this.store.refetchGuests('');

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.handleAppUpdates();
  }

  public ngDoCheck(): void {
    this.refreshPage();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue;

    this.refreshPage();
  }

  public goToGuestDetails(guestId: string): void {
    this.router.navigate(['receptionist-cabinet/guest-details', guestId]);
  }

  public addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  public goToQRCode(role: string): void {
    this.router.navigate(['receptionist-cabinet/qr-code', role]);
  }

  public tabClick(e: any) {
    if (e.index === 0 || e.index === 1) {
      this.activeTab = e.index;
    }

    this.refreshPage();
  }

  public ngOnDestroy(): void {
    if (this.updateAvailableSubscription) {
      this.updateAvailableSubscription.unsubscribe();
    }
    this.store.refetchGuests('stop');
    this.searchValue = '';
  }

  private refreshPage(): void {
    this.inBuilding = this.getGuestNumber('In Building');
    this.departed = this.getGuestNumber('Departed');

    if (this.activeTab === 0) {
      this.filterTable('In Building');
    } else {
      this.filterTable('Departed');
    }
  }

  private filterTable(status: string) {
    this.viewData$?.subscribe((guests: GuestDetailsViewModel[]) => {
      const filteredGuests = guests.filter((item) => item.status === status);
      this.dataSource = new MatTableDataSource(filteredGuests);

      if (this.searchValue.length > 0) {
        this.dataSource.filter = this.searchValue.trim().toLowerCase();
      }
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

    this.viewData$.subscribe((guests: GuestDetailsViewModel[]) => {
      this.dataSource = new MatTableDataSource(guests);
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
            console.log('Current version is', event.current);
            // available version
            console.log('Available version is', event.available);

            /**
             * @todo Replace with modal later on
             */
            if (confirm('Do you want to update?')) {
              this.ngswService.activateUpdate().then(() => document.location.reload());
            }
          }
        });
    }
  }
}
