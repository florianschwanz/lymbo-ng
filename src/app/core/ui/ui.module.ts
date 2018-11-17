import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeService} from './services/theme.service';
import {SnackbarService} from './services/snackbar.service';
import {MediaService} from './services/media.service';
import {ColorService} from './services/color.service';
import {MaterialColorService} from './services/material-color.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ColorService,
    MaterialColorService,
    MediaService,
    SnackbarService,
    ThemeService
  ]
})
/**
 * Contains services related to UI
 */
export class UiModule {
}
