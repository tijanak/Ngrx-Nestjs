import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleCertificatePageComponent } from './sale-certificate-page.component';

describe('SaleCertificatePageComponent', () => {
  let component: SaleCertificatePageComponent;
  let fixture: ComponentFixture<SaleCertificatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleCertificatePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleCertificatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
