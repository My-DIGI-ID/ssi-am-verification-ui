import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import ReceptionistCabinetComponent from './receptionist-cabinet.component';
import NgswService from '@shared/services/ngsw.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';

xdescribe('ReceptionistCabinetComponent', () => {
  let component: ReceptionistCabinetComponent;
  let fixture: ComponentFixture<ReceptionistCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceptionistCabinetComponent],
      imports: [
        HttpClientTestingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
        RouterTestingModule,
      ],
      providers: [NgswService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
