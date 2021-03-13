import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('On initialise', () => {
    it('should generate images set for 16', () => {
      expect([...new Set(component.cardImages)].length).toEqual(8);
    });

    it('should generate 15 set of cards', () => {
      expect(component.cards.length).toEqual(15);
    });

    it('should set default state on all cards', () => {
      const cardStatus = component.cards.map((card) => card.state);
      expect([...new Set(cardStatus)]).toEqual(['default']);
    });
  });

  describe('On card selection', () => {
    it('should store the selected card index', () => {
      component.flippedCards = [];
      component.selectedCard(1);
      expect(component.selectedCardIndex).toEqual([1]);
    });

    it('should store the card which is flipped', () => {
      component.cards = [{ state: 'default', image: '1' }];
      component.flippedCards = [];
      component.selectedCard(0);
      expect(component.flippedCards).toEqual([
        { state: 'flipped', image: '1' },
      ]);
    });

    describe('On selection of 2 cards', () => {
      describe('When cards do not match', () => {
        beforeEach(() => {
          component.selectedCardIndex = [0];
          component.cards = [
            { state: 'default', image: '1' },
            { state: 'default', image: '2' },
          ];
          component.flippedCards = [{ state: 'flipped', image: '1' }];
        });

        it('should store the card which is flipped', () => {
          component.selectedCard(1);
          expect(component.flippedCards).toEqual([
            { state: 'flipped', image: '1' },
            { state: 'flipped', image: '2' },
          ]);
          expect(component.selectedCardIndex).toEqual([0, 1]);
        });

        it('should reset the flipped cards if cards do not match', fakeAsync(() => {
          component.selectedCard(1);
          tick(1000);
          expect(component.flippedCards).toEqual([]);
        }));

        it('should switch the player', fakeAsync(() => {
          component.isPlayer1 = true;
          component.selectedCard(1);
          tick(1000);
          expect(component.isPlayer1).toBeFalsy();
        }));
      });

      describe('When cards are matching', () => {
        beforeEach(() => {
          component.selectedCardIndex = [0];
          component.cards = [
            { state: 'default', image: '1' },
            { state: 'default', image: '1' },
          ];
          component.flippedCards = [{ state: 'flipped', image: '1' }];
        });

        it('should record score for the player', fakeAsync(() => {
          component.selectedCard(1);
          tick(1000);
          expect(component.player1Score).toEqual(1);
        }));

        it('should switch the player', fakeAsync(() => {
          component.isPlayer1 = true;
          component.selectedCard(1);
          tick(1000);
          expect(component.isPlayer1).toBeFalsy();
        }));
      });
    });

    describe('On game complete', () => {
      it('should announce the winner', () => {
        component.player1Score = 1;
        component.cards = component.cardImages.map((image) => {
          return {
            image,
            state: 'matched',
          };
        });
        component.cards = [...component.cards].splice(0, 14);
        component.announceWinner();
        expect(component.winnerText).toEqual('PLAYER 1 is the winner');
      });

      it('should announce the winner', () => {
        component.player2Score = 1;
        component.cards = component.cardImages.map((image) => {
          return {
            image,
            state: 'matched',
          };
        });
        component.cards = [...component.cards].splice(0, 14);
        component.announceWinner();
        expect(component.winnerText).toEqual('PLAYER 2 is the winner');
      });

      it('should announce the tie', () => {
        component.player2Score = 1;
        component.player1Score = 1;
        component.cards = component.cardImages.map((image) => {
          return {
            image,
            state: 'matched',
          };
        });
        component.cards = [...component.cards].splice(0, 14);
        component.announceWinner();
        expect(component.winnerText).toEqual('Its a tie');
      });
    });
  });
});
