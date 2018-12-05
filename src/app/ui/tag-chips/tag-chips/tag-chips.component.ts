import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operators';

/**
 * Displays tag chips
 */
@Component({
  selector: 'app-tag-chips',
  templateUrl: './tag-chips.component.html',
  styleUrls: ['./tag-chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagChipsComponent implements OnInit {

  /** Tags to be displayed */
  @Input() tags: string[] = [];
  /** Whether the component is readonly */
  @Input() readonly = false;
  /** Array of options */
  @Input() tagOptions: string[] = [];
  /** Text color of the tag */
  @Input() color: 'black';
  /** Background color of the tag */
  @Input() background: 'white';
  /** Placeholder for new elements */
  @Input() placeholder = 'New tag';
  /** Event emitter indicating changes in tags */
  @Output() tagsChangedEmitter = new EventEmitter<string[]>();

  /** Current value of input field */
  value = '';
  /** Debouncer for input field */
  debouncer = new Subject();
  /** Array of options filtered by currently typed value */
  optionsFiltered: string[];

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init lifecycle phase
   */
  ngOnInit() {
    this.initializeOptions();
    this.initializeDebouncer();
  }

  //
  // Initialization
  //

  /**
   * Initialize auto-complete options
   */
  private initializeOptions() {
    this.optionsFiltered = this.tagOptions;
  }

  /**
   * Initializes debouncer
   */
  private initializeDebouncer() {
    this.debouncer.pipe(
      debounceTime(500)
    ).subscribe((value: string[]) => this.tagsChangedEmitter.emit(value));
  }

  //
  // Actions
  //

  /**
   * Handles changes in input field value
   * @param value input field value
   */
  onValueChanged(value: string) {
    this.value = value;
    this.optionsFiltered = this.filterAutoCompleteOptions(this.value);
  }


  /**
   * Handles deletion of a tag
   * @param {string} value tag to be deleted
   */
  onDeleteTag(value: string) {
    if (!this.readonly) {
      this.tags = this.tags.filter(tag => {
        return tag !== value;
      });

      this.notify();
    }
  }

  /**
   * Handles key up event
   * @param event
   */
  onKeyUp(event: any) {
    if (!this.readonly) {
      const KEY_CODE_ENTER = 13;
      const KEY_CODE_COMMA = 188;

      if (this.value !== '' && this.value !== ','
        && (event.keyCode === KEY_CODE_ENTER || event.keyCode === KEY_CODE_COMMA)) {
        this.tags.push(this.value.replace(/,/, ''));
        this.value = '';
        this.notify();
      }
    }
  }

  /**
   * Handles key down event
   */
  onKeyDown() {
    this.value = this.value.replace(/,/, '');
  }

  /**
   * Handles selection of an auto-complete option
   */
  onOptionSelected() {
    if (!this.readonly) {
      this.tags.push(this.value.replace(/,/, ''));
      this.value = '';
      this.notify();
    }
  }

  //
  // Helpers
  //

  /**
   * Filters auto-complete options
   * @param {string} value input value
   * @returns {string[]} filtered options
   */
  filterAutoCompleteOptions(value: string): string[] {
    return this.tagOptions.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  }

  //
  // Notifications
  //

  /**
   * Informs subscribers that something has changed
   */
  private notify() {
    this.debouncer.next(this.tags);
  }
}