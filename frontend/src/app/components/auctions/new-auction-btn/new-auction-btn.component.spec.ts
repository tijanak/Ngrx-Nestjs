import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAuctionBtnComponent } from './new-auction-btn.component';

describe('NewAuctionBtnComponent', () => {
  let component: NewAuctionBtnComponent;
  let fixture: ComponentFixture<NewAuctionBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAuctionBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAuctionBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
