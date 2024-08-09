import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleCertificatesComponent } from './sale-certificates.component';

describe('SaleCertificatesComponent', () => {
  let component: SaleCertificatesComponent;
  let fixture: ComponentFixture<SaleCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleCertificatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
