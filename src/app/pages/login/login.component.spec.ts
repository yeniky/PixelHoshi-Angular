import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule], // componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar con el formulario inválido', () => {
    expect(component.formLogin.valid).toBeFalsy();
  });

  it('debería marcar el formulario inválido si faltan campos', () => {
    component.formLogin.setValue({
      email: '',
      password: '',
    });

    expect(component.formLogin.valid).toBeFalsy();
  });

  it('debería ser válido con datos correctos', () => {
    component.formLogin.setValue({
      email: 'test@pixelhoshi.com',
      password: 'Password*1',
    });

    expect(component.formLogin.valid).toBeTruthy();
  });
});
