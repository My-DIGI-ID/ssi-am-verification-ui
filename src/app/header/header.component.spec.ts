import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { MatIconModule } from '@angular/material/icon';

import HeaderComponent from './header.component';

let userLoggedIn: boolean = true;
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

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatToolbarModule, MatIconModule],
      providers: [{ provide: KeycloakService, useValue: keycloakServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an instance of mat-toolbar', async () => {
    const toolbar = await loader.getAllHarnesses(MatToolbarHarness);

    expect(toolbar.length).toBe(1);
  });

  it('if I call the logout function the keycloak service is also called', async () => {
    const keycloakServiceLogoutSpy = spyOn(keycloakServiceMock, 'logout').and.callThrough();
    component.logout();

    expect(keycloakServiceLogoutSpy).toHaveBeenCalledTimes(1);
  });

  it('if I call the loadUserProfile function the keycloak service is also called', async () => {
    const keycloakServiceLoadUserProfileSpy = spyOn(keycloakServiceMock, 'loadUserProfile').and.callThrough();
    // eslint-disable-next-line dot-notation
    component['loadUserProfile']();

    expect(keycloakServiceLoadUserProfileSpy).toHaveBeenCalledTimes(1);
  });

  it('if I call the ngOnInit and the user is not logged in, the keycloak service function loadUserProfile should not be called', async () => {
    userLoggedIn = false;
    const keycloakServiceLoadUserProfileSpy = spyOn(keycloakServiceMock, 'loadUserProfile').and.callThrough();
    component.ngOnInit();

    expect(keycloakServiceLoadUserProfileSpy).toHaveBeenCalledTimes(0);
  });

  it('if I call the ngOnInit and the user profile is not retrieved  is not logged in, the keycloak service function getUsername should not be called', async () => {
    const keycloakServiceLoadUserProfileSpy = spyOn(keycloakServiceMock, 'getUsername').and.callThrough();
    // eslint-disable-next-line dot-notation
    component['loadUserProfile']();

    expect(keycloakServiceLoadUserProfileSpy).toHaveBeenCalledTimes(0);
  });
});
