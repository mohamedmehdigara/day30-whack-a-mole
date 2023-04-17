// game.module.ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoleComponent } from './mole/mole.component';
import { RemainingTimePipe, WhackAMoleMessagePipe } from './pipes';

@NgModule({
  declarations: [
    MoleComponent,
    WhackAMoleMessagePipe,
    RemainingTimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoleComponent
  ]
})
export class GameModule { }

// app.module.ts

import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameModule } from './game';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: (platformLocation: PlatformLocation) => platformLocation.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }