import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTurnosAdminComponent } from './historial-turnos-admin.component';

describe('HistorialTurnosAdminComponent', () => {
  let component: HistorialTurnosAdminComponent;
  let fixture: ComponentFixture<HistorialTurnosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialTurnosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialTurnosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
