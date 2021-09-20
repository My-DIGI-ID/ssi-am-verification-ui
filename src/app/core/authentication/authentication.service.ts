import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export default class AuthenticationService {
  constructor(private keycloakService: KeycloakService) {}

  isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  login(): void {
    this.keycloakService.login();
  }

  loadUserProfile(): Promise<KeycloakProfile> {
    return this.keycloakService.loadUserProfile();
  }

  logout(): void {
    this.keycloakService.logout();
  }

  getRoles(): Array<string> {
    return this.keycloakService.getUserRoles();
  }

  getUserName(): string {
    return this.keycloakService.getUsername();
  }

  getToken(): Promise<string> {
    return this.keycloakService.getToken();
  }
}
