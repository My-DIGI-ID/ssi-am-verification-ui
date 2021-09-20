import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import environment from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export default class ConfigInitService {
  private config: any;

  constructor(private httpClient: HttpClient) {}

  public getConfig(): Observable<any> {
    return this.httpClient
      .get(this.getConfigFile(), {
        observe: 'response',
      })
      .pipe(
        catchError((error) => of(error)),
        mergeMap((response) => {
          if (response && response.body) {
            this.config = response.body;
            return of(this.config);
          }
          return of(null);
        })
      );
  }

  public getConfigStatic(): any {
    return this.config;
  }

  // eslint-disable-next-line class-methods-use-this
  private getConfigFile(): string {
    return environment.configFile;
  }
}
