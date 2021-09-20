import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import MockEmployeeCredential from 'src/assets/mockData/mock-employee-credential';
import EmployeeCredentialApiModel from '../../models/employee-credential-api.model';

@Injectable({
  providedIn: 'root',
})
export default class EmployeeCredentialApiService {
  private mockEmployeeCredential: EmployeeCredentialApiModel = MockEmployeeCredential.createMockEmployeeCredential();

  private http: HttpClient;

  constructor(private _http: HttpClient) {
    this.http = _http;
  }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   *
   * @returns an Obserable with array of employee credentials
   * @todo WIP add correct endpoint
   */
  getEmployeeCredentials(): Observable<EmployeeCredentialApiModel[]> {
    return this.http
      .get<EmployeeCredentialApiModel[]>(`placeholder`)
      .pipe(retry(1), catchError(EmployeeCredentialApiService.processError));
  }

  getEmployeeCredentialById(id: number): Observable<EmployeeCredentialApiModel> {
    // @FIXME: Once controller is in place remove mock
    // return this.http
    //   .get<EmployeeCredentialApiModel>(environment.endpoint + '')
    //   .pipe(retry(1), catchError(this.processError));
    if (id === 1) {
      return of(this.mockEmployeeCredential);
    }
    this.mockEmployeeCredential.firstName = 'John';
    this.mockEmployeeCredential.lastName = 'Doe';
    return of(this.mockEmployeeCredential);
  }

  private static processError(err: any): Observable<never> {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(message);
  }
}
