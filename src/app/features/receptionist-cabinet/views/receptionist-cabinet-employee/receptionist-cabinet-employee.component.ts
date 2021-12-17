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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import EmployeeStoreService from '../../services/store/employee.store.service';
import EmployeeDashboardViewModel from '../../models/employee-dashboard-view.model';

@Component({
  selector: 'app-receptionist-cabinet-employee',
  templateUrl: './receptionist-cabinet-employee.component.html',
  styleUrls: ['./receptionist-cabinet-employee.component.scss'],
})
export class ReceptionistCabinetEmployeeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, { static: true })
  private paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  private sort!: MatSort;

  public dataSource = new MatTableDataSource<any>();

  public displayedColumns: string[] = ['employeeId', 'firstName', 'lastName', 'location', 'status', 'updated'];

  public viewData$: Observable<EmployeeDashboardViewModel[]> | undefined;

  public dataSourceLength!: number;

  public searchValue: string = '';

  /**
   * Creates an instance of ReceptionistCabinetEmployeeComponent.
   * @param {EmployeeStoreService} store - EmployeeStoreService - contains employee related functions
   * @param {Router} router - A service that provides navigation among views and URL manipulation capabilities.
   * @param {TranslateService} translate - A service that provides transalation
   * @memberof ReceptionistCabinetEmployeeComponent
   */
  public constructor(
    private readonly store: EmployeeStoreService,
    private readonly router: Router,
    private translate: TranslateService
  ) {}

  /**
   * Initialize the ReceptionistCabinetEmployeeComponent: Connetcting the store, and subscribing the employeeList, handling the app update.
   * @memberof ReceptionistCabinetEmployeeComponent
   */
  public ngOnInit(): void {
    this.subscribe();
    this.init();
  }

  /**
   * Handle any additional initialization tasks, after Angular has fully initialized a component's view, refresh the pagination and sorting on the table.
   * @memberof ReceptionistCabinetEmployeeComponent
   */
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Extract the searchValue from the event, and calling the refreshPage function
   * @param {Event} event - The Event interface represents an event which takes place in the DOM
   * @memberof ReceptionistCabinetEmployeeComponent
   */
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue;

    this.refreshPage();
  }

  /**
   * @todo refactor this part
   * Going to the QR Code page, based on the role
   * @param {string} role
   * @memberof ReceptionistCabinetEmployeeComponent
   */
  public goToQRCode(role: string): void {
    this.router.navigate(['receptionist-cabinet/qr-code', role]);
  }

  /**
   * Going to the dashboard page
   * @memberof ReceptionistCabinetEmployeeComponent
   */
  public goToGuestDashboard(): void {
    this.router.navigateByUrl('receptionist-cabinet');
  }

  /**
   * Custom cleanup that needs to occur when the instance is destroyed: clean the searchValue
   * @memberof ReceptionistCabinetEmployeeComponent
   */
  public ngOnDestroy(): void {
    this.searchValue = '';
  }

  private refreshPage(): void {
    this.filterTable();
  }

  private filterTable() {
    this.viewData$?.subscribe((employees: EmployeeDashboardViewModel[]) => {
      const filteredGuests = employees.filter((item) => item);
      this.dataSource = new MatTableDataSource(filteredGuests);

      if (this.searchValue.length > 0) {
        this.dataSource.filter = this.searchValue.trim().toLowerCase();
      }

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSourceLength = this.dataSource.filteredData.length;
    });
  }

  private subscribe(): void {
    this.viewData$ = this.store.connect();

    this.viewData$?.subscribe(() => {
      this.refreshPage();
    });
  }

  private init(): void {
    this.store.init();
  }
}
