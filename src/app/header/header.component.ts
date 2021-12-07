import { KeycloakProfile } from 'keycloak-js';
import { Component, OnInit } from '@angular/core';
import AuthenticationService from '../core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  public loggedInUser: string | undefined;

  public constructor(private authenticationService: AuthenticationService) {}

  public ngOnInit(): void {
    this.authenticationService
      .isLoggedIn()
      .then((userLoggedIn: boolean) => {
        if (userLoggedIn) {
          this.loadUserProfile();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public logout() {
    this.authenticationService.logout();
  }

  private loadUserProfile(): void {
    this.authenticationService.loadUserProfile().then((userProfile: KeycloakProfile) => {
      if (userProfile) {
        this.loggedInUser = this.authenticationService.getUserName();
      }
    });
  }
}
