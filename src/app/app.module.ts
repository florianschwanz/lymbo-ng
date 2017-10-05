import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {PlatformService} from './services/platform.service';
import {ResponsiveModule} from 'ng2-responsive';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCardModule, MdMenuModule, MdSnackBarModule, MdToolbarModule} from '@angular/material';
import {StacksService} from './services/stacks.service';
import {StackComponent} from './components/stack/stack.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    StackComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    HttpModule,
    ResponsiveModule,
    MdButtonModule,
    MdToolbarModule,
    MdSnackBarModule,
    MdCardModule,
    MdMenuModule
  ],
  providers: [PlatformService, StacksService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
