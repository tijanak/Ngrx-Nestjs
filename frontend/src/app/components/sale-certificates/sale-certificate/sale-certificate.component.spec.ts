import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleCertificateComponent } from './sale-certificate.component';

describe('SaleCertificateComponent', () => {
  let component: SaleCertificateComponent;
  let fixture: ComponentFixture<SaleCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleCertificateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
