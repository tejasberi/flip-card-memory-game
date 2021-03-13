import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
} from '@angular/core';
import { slideFromTopAnimation } from '../../animations/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [slideFromTopAnimation],
})
export class ModalWindowComponent implements AfterViewInit, OnDestroy {
  @Input() headerText = '';
  @Input() bodyText = '';
  @Input() buttonText = '';
  @Output() closeEvent = new EventEmitter<boolean>();

  ngAfterViewInit(): void {
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.closeEvent.emit();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }
}
