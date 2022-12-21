import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CanvasComponent } from './component/canvas/canvas.component';
import { CurrentTimestampProvider } from './service/providers/currentTimestamp.provider';
import { TIMESTAMP_PROVIDER } from './service/tokens';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { GameOverComponent } from './component/game-over/game-over.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    GameOverComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule
  ],
  providers: [{
    provide: TIMESTAMP_PROVIDER,
    useClass: CurrentTimestampProvider
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
