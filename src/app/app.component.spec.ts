import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import AppComponent from './app.component';
import HeaderComponent from './header/header.component';

const userLoggedIn: boolean = true;
const userProfile: KeycloakProfile = {};

const keycloakServiceMock = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: (): void => {},
  loadUserProfile: (): Promise<KeycloakProfile> =>
    new Promise((resolve) => {
      resolve(userProfile);
    }),
  getUsername: (): string => 'mock keycloak user',
  isLoggedIn: (): Promise<boolean> =>
    new Promise((resolve) => {
      resolve(userLoggedIn);
    }),
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatToolbarModule, MatIconModule],
      declarations: [AppComponent, HeaderComponent],
      providers: [{ provide: KeycloakService, useValue: keycloakServiceMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ssi-am-verification-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ssi-am-verification-ui');
  });
});
