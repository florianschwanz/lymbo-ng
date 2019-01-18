import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class CompletableListItemComponent implements OnInit {

  /** Item to be display */
  @Input() item: SelectableItem;
  /** Whether component is readonly or not */
  @Input() readonly = false;
  /** Event emitter indicating item changes */
  @Output() itemChangedEmitter = new EventEmitter<any>();

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
   * Initializes style sheet
   */
  private initializeStyleSheet() {
    this.itemClass = this.item.selected ? 'selected' : 'unselected';
  }

  //
  // Actions
  //

  /**
   * Handles selection of an item
   * @param event selection state
   */
  onItemSelected(event: any) {
    this.item.selected = event.checked;
    this.itemChangedEmitter.emit();
  }

  /**
   * Handles text changes
   * @param text text
   */
  onTextChanged(text: string) {
    this.item.text = text;
    this.itemChangedEmitter.emit();
  }

  /**
   * Handles click on delete button
   */
  onDeleteClicked() {
    this.item.text = null;
    this.itemChangedEmitter.emit();
  }
}
