import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent, RouterTestingModule], // standalone
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar con el formulario inválido', () => {
    expect(component.formRegistro.valid).toBeFalsy();
  });

  it('debería marcar inválido cuando las contraseñas no coinciden', () => {
    component.formRegistro.setValue({
      email: 'test@pixelhoshi.com',
      password: 'Password*1',
      repetirPassword: 'OtraCosa*1',
    });

    expect(component.formRegistro.valid).toBeFalsy();
    expect(component.formRegistro.errors?.['noCoincide']).toBeTruthy();
  });

  it('debería ser válido con datos correctos', () => {
    component.formRegistro.setValue({
      email: 'test@pixelhoshi.com',
      password: 'Password*1',
      repetirPassword: 'Password*1',
    });

    expect(component.formRegistro.valid).toBeTruthy();
  });
});
