import { Injectable } from '@angular/core';
import { SwUpdate, UnrecoverableStateEvent, UpdateActivatedEvent, UpdateAvailableEvent } from '@angular/service-worker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class NgswService {
  private swUpdateService: SwUpdate;

  constructor(private _swUpdate: SwUpdate) {
    this.swUpdateService = _swUpdate;
  }

  isEnabled(): boolean {
    return this.swUpdateService.isEnabled;
  }

  isUpdateAvailable(): Observable<UpdateAvailableEvent> {
    return this.swUpdateService.available;
  }

  activateUpdate(): Promise<void> {
    return this.swUpdateService.activateUpdate();
  }

  isUpdateActivated(): Observable<UpdateActivatedEvent> {
    return this.swUpdateService.activated;
  }

  handleUnrecoverableState(): Observable<UnrecoverableStateEvent> {
    return this.swUpdateService.unrecoverable;
  }
}
