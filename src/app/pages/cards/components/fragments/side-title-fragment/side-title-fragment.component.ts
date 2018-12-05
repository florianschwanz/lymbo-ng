import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operators';

/**
 * Displays side title
 */
@Component({
  selector: 'app-side-title-fragment',
  templateUrl: './side-title-fragment.component.html',
  styleUrls: ['./side-title-fragment.component.scss']
})
export class SideTitleFragmentComponent implements OnInit {

  /** Side name to be displayed */
  @Input() sideTitle: string;
  /** Placeholder */
  @Input() placeholder: string;
  /** Readonly dialog if true */
  @Input() readonly: false;
  /** Event emitter indicating changes in side title */
  @Output() sideTitleChangedEmitter = new EventEmitter<string>();

  /** Debouncer for input field */
  debouncer = new Subject();

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.initializeDebouncer();
  }

  //
  // Initialization
  //

  /**
   * Initializes debouncer
   */
  private initializeDebouncer() {
    this.debouncer.pipe(
      debounceTime(500)
    ).subscribe((value: string) => this.sideTitleChangedEmitter.emit(value));
  }

  //
  // Actions
  //

  /**
   * Handles side title changes
   * @param sideTitle side title
   */
  onSideTitleChanged(sideTitle: string) {
    this.sideTitle = sideTitle;
    this.debouncer.next(sideTitle);
  }

  /**
   * Handles key up event
   */
  onKeyUp() {
    this.notify();
  }

  /**
   * Handles option selection
   */
  onOptionSelected() {
    this.notify();
  }

  //
  // Notification
  //

  /**
   * Informs subscribers that something has changed
   */
  private notify() {
    this.debouncer.next(this.sideTitle);
  }
}