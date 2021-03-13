import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { card } from '../../interfaces/card.interface';
import { CardStatus } from '../../constants/card-state.enum';

@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrls: ['./display-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayCardComponent {
  @Input() card: card = {
    state: '',
    image: '',
  };
  @Input() cardFlipped = false;
  @Input() allowFlip = true;
  @Output() selectedCard = new EventEmitter();

  flipCard(): void {
    if (this.card.state !== CardStatus[2] && this.allowFlip) {
      this.cardFlipped = true;
      this.selectedCard.emit();
    }
  }
}
