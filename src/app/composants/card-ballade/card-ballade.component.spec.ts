import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBalladeComponent } from './card-ballade.component';

describe('CardBalladeComponent', () => {
  let component: CardBalladeComponent;
  let fixture: ComponentFixture<CardBalladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBalladeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBalladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
