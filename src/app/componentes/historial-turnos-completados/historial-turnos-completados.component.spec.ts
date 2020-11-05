import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTurnosCompletadosComponent } from './historial-turnos-completados.component';

describe('HistorialTurnosCompletadosComponent', () => {
  let component: HistorialTurnosCompletadosComponent;
  let fixture: ComponentFixture<HistorialTurnosCompletadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialTurnosCompletadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialTurnosCompletadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
