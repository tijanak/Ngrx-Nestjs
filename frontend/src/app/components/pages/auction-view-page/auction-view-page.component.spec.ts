import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionViewPageComponent } from './auction-view-page.component';

describe('AuctionViewPageComponent', () => {
  let component: AuctionViewPageComponent;
  let fixture: ComponentFixture<AuctionViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionViewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
