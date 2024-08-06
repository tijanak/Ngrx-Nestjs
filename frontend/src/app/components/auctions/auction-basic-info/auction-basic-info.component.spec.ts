import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionBasicInfoComponent } from './auction-basic-info.component';

describe('AuctionBasicInfoComponent', () => {
  let component: AuctionBasicInfoComponent;
  let fixture: ComponentFixture<AuctionBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionBasicInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
