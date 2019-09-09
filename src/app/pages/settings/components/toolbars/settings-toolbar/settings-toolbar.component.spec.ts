import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsToolbarComponent} from './settings-toolbar.component';
import {SettingsDeclarations} from '../../../settings.declarations';
import {SettingsImports} from '../../../settings.imports';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SettingsToolbarComponent', () => {
  let component: SettingsToolbarComponent;
  let fixture: ComponentFixture<SettingsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SettingsImports, BrowserAnimationsModule],
      declarations: [SettingsDeclarations],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
