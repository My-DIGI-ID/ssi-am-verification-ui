/* eslint-disable class-methods-use-this */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ConfigInitService from 'src/app/core/authentication/config-init.service';
import VerificationApiModel from '../../models/verification-api.model';

@Injectable({
  providedIn: 'root',
})
export default class GuestVerificationApiService {
  public httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private readonly http: HttpClient, private readonly configServie: ConfigInitService) {}

  public getAllGuests(): Observable<VerificationApiModel[]> {
    return this.http.get<VerificationApiModel[]>(
      `${
        this.configServie.getConfigStatic().VERIFICATION_CONTROLLER_BASE_URL
      }/verification-process-completion?locationId=1&terminalId=1`
    );
  }
}
