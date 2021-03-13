import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideFromTopAnimation: AnimationTriggerMetadata = trigger(
  'slideFromTopAnimation',
  [
    transition(':enter', [
      style({ top: '5%', opacity: 0 }),
      animate('0.5s ease-in-out', style({ top: '0', opacity: 1 })),
    ]),
    transition(':leave', [
      style({ top: '0', opacity: 0 }),
      animate('0.3s ease-in-out', style({ top: '5%', opacity: 0 })),
    ]),
  ]
);
