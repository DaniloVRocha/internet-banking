import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoBancarioComponent } from './extrato-bancario.component';

describe('ExtratoBancarioComponent', () => {
  let component: ExtratoBancarioComponent;
  let fixture: ComponentFixture<ExtratoBancarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtratoBancarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratoBancarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
