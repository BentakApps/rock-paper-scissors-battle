import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CanvasComponent } from './component/canvas/canvas.component';
import { CurrentTimestampProvider } from './service/providers/currentTimestamp.provider';
import { TIMESTAMP_PROVIDER } from './service/tokens';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [{
    provide: TIMESTAMP_PROVIDER,
    useClass: CurrentTimestampProvider
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
