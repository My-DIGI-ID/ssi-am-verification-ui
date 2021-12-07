/* eslint-disable dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QRCodeComponent } from 'angularx-qrcode';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import ConfigInitService from '../../../../core/authentication/config-init.service';
import { QrCodeEmployeeComponent } from './qr-code-employee.component';
import Spy = jasmine.Spy;

class ConfigServiceMock {
  init = jasmine.createSpy();

  getConfigStatic = jasmine.createSpy().and.returnValue({ AVERIFICATION_CONTROLLER_BASE_URL: 'myUrl' });
}

describe('HeaderComponent', () => {
  let component: QrCodeEmployeeComponent;
  let fixture: ComponentFixture<QrCodeEmployeeComponent>;
  let routerSpy: Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeEmployeeComponent, QRCodeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MatIconModule, MatButtonModule],
      providers: [{ provide: ConfigInitService, useClass: ConfigServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeEmployeeComponent);
    component = fixture.componentInstance;
    routerSpy = spyOn(component['router'], 'navigateByUrl');

    fixture.detectChanges();
  });

  it('instance should be successfully created', () => {
    expect(component).toBeTruthy();
  });

  it(`if I call the 'goToReceptionistCabinet' function, I should be taken to the /receptionist-cabinet page`, () => {
    component.goToReceptionistCabinet();

    expect(routerSpy).toHaveBeenCalledOnceWith('/receptionist-cabinet');
  });
});
