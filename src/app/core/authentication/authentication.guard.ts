import { Injectable } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export default class AuthenticationGuard extends KeycloakAuthGuard {
  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      if (!this.authenticated) {
        this.keycloakAngular.login();
        resolve(false);
        return;
      }

      // In case we will use the roles set in Keycloak
      const requiredRoles = route.data.roles;
      let accessGranted: boolean = false;
      // allow acces when no additional roles are required to enter
      if (!requiredRoles || requiredRoles.length === 0) {
        accessGranted = true;
      } else {
        // eslint-disable-next-line no-restricted-syntax
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1) {
            accessGranted = true;
            break;
          }
        }
      }

      resolve(accessGranted);
    });
  }
}
