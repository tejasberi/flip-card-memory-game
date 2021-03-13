import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCardComponent } from './display-card.component';

describe('DisplayCardComponent', () => {
  let component: DisplayCardComponent;
  let fixture: ComponentFixture<DisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On card flip', () => {
    it('should update the card flip status', () => {
      component.flipCard();
      expect(component.cardFlipped).toBeTruthy();
    });

    it('should emit the event of selected card', () => {
      const flipSpy = spyOn(component.selectedCard, 'emit');
      component.flipCard();
      expect(flipSpy).toHaveBeenCalled();
    });

    it('should not emit the event of selected card if card is already matched', () => {
      component.card.state = 'matched';
      const flipSpy = spyOn(component.selectedCard, 'emit');
      component.flipCard();
      expect(flipSpy).not.toHaveBeenCalled();
    });
  });
});
