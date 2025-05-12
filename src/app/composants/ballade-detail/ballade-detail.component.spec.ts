import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalladeDetailComponent } from './ballade-detail.component';

describe('BalladeDetailComponent', () => {
  let component: BalladeDetailComponent;
  let fixture: ComponentFixture<BalladeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalladeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalladeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
