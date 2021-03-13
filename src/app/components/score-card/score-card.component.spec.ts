import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScoreCardComponent } from './score-card.component';

describe('ScoreCardComponent', () => {
  let component: ScoreCardComponent;
  let fixture: ComponentFixture<ScoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCardComponent);
    component = fixture.componentInstance;
    component.playerName = 'Player 1';
    component.score = 4;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the score', () => {
    const de = fixture.debugElement.query(By.css('.score'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerHTML).toContain('4');
  });

  it('should display the player name', () => {
    const de = fixture.debugElement.query(By.css('.player'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerHTML).toContain('Player 1');
  });
});
