import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBalladesComponent } from './list-ballades.component';

describe('ListBalladesComponent', () => {
  let component: ListBalladesComponent;
  let fixture: ComponentFixture<ListBalladesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBalladesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBalladesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
