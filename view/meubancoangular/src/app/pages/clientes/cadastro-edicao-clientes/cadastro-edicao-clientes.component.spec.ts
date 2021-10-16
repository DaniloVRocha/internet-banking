import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEdicaoClientesComponent } from './cadastro-edicao-clientes.component';

describe('CadastroEdicaoClientesComponent', () => {
  let component: CadastroEdicaoClientesComponent;
  let fixture: ComponentFixture<CadastroEdicaoClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroEdicaoClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEdicaoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
