import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximosTurnosComponent } from './proximos-turnos.component';

describe('ProximosTurnosComponent', () => {
  let component: ProximosTurnosComponent;
  let fixture: ComponentFixture<ProximosTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProximosTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximosTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
