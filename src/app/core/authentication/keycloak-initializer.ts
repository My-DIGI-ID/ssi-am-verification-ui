import { KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import ConfigInitService from './config-init.service';

export default function keyclockInitializer(keyCloak: KeycloakService, configService: ConfigInitService) {
  return () =>
    configService
      .getConfig()
      .pipe(
        switchMap<any, any>((config) =>
          from(
            keyCloak.init({
              config: {
                url: config.KEYCLOAK_URL,
                realm: config.KEYCLOAK_REALM,
                clientId: config.KEYCLOAK_CLIENT_ID,
              },
              initOptions: {
                // onLoad: 'login-required',
                onLoad: 'check-sso',
                checkLoginIframe: false,
                pkceMethod: 'S256',
              },
              bearerExcludedUrls: [],
            })
          )
        )
      )
      .toPromise();
}
