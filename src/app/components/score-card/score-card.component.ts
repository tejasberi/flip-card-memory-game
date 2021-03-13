import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
})
export class ScoreCardComponent {
  @Input() playerName = '';
  @Input() score = 0;
  @Input() isSelected = false;
}
