import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'rock-paper-scissors-battle';
  count = {r:0,p:0,s:0};
  constructor () {}
  updateCount = (count: any) => {
    this.count = {...count};
  }
}
