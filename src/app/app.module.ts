import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { DragbyDirective } from './dragby.directive';
import { BottomDrawerComponent } from './bottom-drawer/bottom-drawer.component';

@NgModule({
  declarations: [
    AppComponent,
    DragbyDirective,
    BottomDrawerComponent
  ],
  imports: [
    BrowserModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
