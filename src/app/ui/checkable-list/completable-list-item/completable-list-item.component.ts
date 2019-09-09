import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChildren
} from '@angular/core';
import {SelectableItem} from '../selectable-item';

/**
 * Displays checkable list item
 */
@Component({
  selector: 'app-completable-list-item',
  templateUrl: './completable-list-item.component.html',
  styleUrls: ['./completable-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletableListItemComponent implements OnInit, AfterViewInit {

  /** Item to be display */
  @Input() item: SelectableItem;
  /** Whether component is readonly or not */
  @Input() readonly = false;
  /** Whether input fields of new elememnts should be focussed or not */
  @Input() focusNewElement = false;
  /** Event emitter indicating item changes */
  @Output() itemChangedEmitter = new EventEmitter<any>();

  /** Input view child */
  @ViewChildren('label') input;

  /** CSS class */
  itemClass = '';

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.initializeStyleSheet();
  }

  /**
   * Handles after-view-init lifecycle phase
   */
  ngAfterViewInit() {
    if (this.focusNewElement && !this.item.selected && this.input.first != null) {
      this.input.first.nativeElement.focus();
    }
  }

  //
  // Initialization
  //

  /**
   * Initializes style sheet
   */
  private initializeStyleSheet() {
    this.itemClass = (this.item != null && this.item.selected) ? 'selected' : 'unselected';
  }

  //
  // Actions
  //

  /**
   * Handles selection of an item
   * @param event selection state
   */
  onItemSelected(event: any) {
    if (this.item != null) {
      this.item.selected = event.checked;
      this.itemChangedEmitter.emit();
    }
  }

  /**
   * Handles text changes
   * @param text text
   */
  onTextChanged(text: string) {
    if (this.item != null) {
      this.item.text = text;
      this.itemChangedEmitter.emit();
    }
  }

  /**
   * Handles click on delete button
   */
  onDeleteClicked() {
    if (this.item != null) {
      this.item.text = null;
      this.itemChangedEmitter.emit();
    }
  }
}
