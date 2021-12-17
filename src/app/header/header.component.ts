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

  /**
   * Creates an instance of HeaderComponent.
   * @param {AuthenticationService} authenticationService - Service that authenticate the user
   * @memberof HeaderComponent
   */
  public constructor(private authenticationService: AuthenticationService) {}

  /**
   * Initialize the HeaderComponent, calling the authentication service, and loading the loadUserProfile if the user is logged in.
   * @memberof HeaderComponent
   */
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

  /**
   * Calling the authenticationService logout function in order to logout the user
   * @memberof HeaderComponent
   */
  public logout(): void {
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
