import { card } from './interfaces/card.interface';
import { Component } from '@angular/core';
import { CardStatus } from './constants/card-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cards = new Array(15);
  cardImages = new Array(8);
  flippedCards: card[] = [];
  selectedCardIndex: number[] = [];
  winnerText = '';
  isSinglePlayer = true;
  showPlayerModal = true;
  isPlayer1 = true;
  player1Score = 0;
  player2Score = 0;
  showModal = false;
  imageSourceBaseUrl = `https://picsum.photos/200/300?random=`;

  enableSinglePlayer(): void {
    this.isSinglePlayer = true;
    this.initializeGame();
  }

  enableMultiPlayer(): void {
    this.isSinglePlayer = false;
    this.initializeGame();
  }

  initializeGame(): void {
    this.showPlayerModal = false;
    this.player1Score = 0;
    this.player2Score = 0;
    this.cardImages = [];
    this.cards = [];
    this.generateImages();
    this.generateCards();
  }

  generateImages(): void {
    [...Array(8)].map(
      (_, i) => (this.cardImages[i] = `${this.imageSourceBaseUrl}${i}`)
    );
    this.cardImages = [...this.cardImages, ...this.cardImages];
  }

  generateCards(): void {
    this.cards = this.cardImages.map((image) => {
      return {
        image,
        state: CardStatus[0],
      };
    });
    this.cards = [...this.shuffleCards(this.cards)].splice(0, 15);
  }

  shuffleCards(arr: any[]): any[] {
    return arr
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  }

  selectedCard(index: number): void {
    // get the 2 most recently flipped cards
    if (
      this.flippedCards.length < 2 &&
      !this.selectedCardIndex.includes(index)
    ) {
      this.selectedCardIndex.push(index);
      this.cards[index].state = CardStatus[1];
      this.flippedCards.push(this.cards[index]);
    } else {
      return;
    }
    this.checkMatchingCards();
  }

  checkMatchingCards(): void {
    // check of 2 cards are matching
    if (this.selectedCardIndex.length === 2) {
      // not matched
      if (this.flippedCards[0].image !== this.flippedCards[1].image) {
        setTimeout(() => {
          this.selectedCardIndex.forEach((index) => {
            this.cards[index].state = CardStatus[0];
          });
          this.flippedCards = [];
          this.selectedCardIndex = [];
          this.monitorScore(false);
        }, 1000);
      }
      // matched
      else {
        setTimeout(() => {
          this.flippedCards.map((card: card) => (card.state = CardStatus[2]));
          this.flippedCards = [];
          this.selectedCardIndex = [];
          this.monitorScore(true);
          this.announceWinner();
        }, 1000);
      }
    }
  }

  monitorScore(hasScored?: boolean): void {
    if (hasScored) {
      this.isPlayer1 ? ++this.player1Score : ++this.player2Score;
    }
    this.isPlayer1 = !this.isPlayer1;
  }

  announceWinner(): void {
    if (
      this.cards.filter((card) => card.state === CardStatus[2]).length === 14
    ) {
      if (!this.isSinglePlayer) {
        this.winnerText =
          this.player1Score === this.player2Score
            ? 'Its a tie'
            : this.player1Score > this.player2Score
            ? 'PLAYER 1 is the winner'
            : 'PLAYER 2 is the winner';
        this.showModal = true;
      } else {
        this.winnerText = 'You have successfully completed the game !!';
        this.showModal = true;
      }
    }
  }
}
