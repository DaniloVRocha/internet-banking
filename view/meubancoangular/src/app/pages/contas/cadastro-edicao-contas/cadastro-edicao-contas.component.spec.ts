import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEdicaoContasComponent } from './cadastro-edicao-contas.component';

describe('CadastroEdicaoContasComponent', () => {
  let component: CadastroEdicaoContasComponent;
  let fixture: ComponentFixture<CadastroEdicaoContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroEdicaoContasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEdicaoContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
