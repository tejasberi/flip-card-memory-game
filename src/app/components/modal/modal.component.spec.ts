import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalWindowComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalWindowComponent;
  let fixture: ComponentFixture<ModalWindowComponent>;
  const noop = () => {};
  const mockEvent: any = { stopPropagation: noop, preventDefault: noop };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [ModalWindowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWindowComponent);
    component = fixture.componentInstance;
    spyOn(mockEvent, 'stopPropagation').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Close modal', () => {
    it('should call close correclty', () => {
      const emitSPy = spyOn(component.closeEvent, 'emit');
      component.close();
      expect(emitSPy).toHaveBeenCalled();
    });
  });
});
