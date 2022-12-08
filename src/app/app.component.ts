import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'rock-paper-scissors-battle';
  message = "";
  count = {r:0,p:0,s:0};
  gameOver:boolean = false;
  restarting:boolean = false;

  constructor () {}
  
  updateCount = (count: any) => {
    this.count = {...count};
  }
  updateMessage = (message:string) => {
    this.message = message;
    this.gameOver = true;
  }
  restart = () => {
    this.restarting = true;
    setTimeout(()=>this.restarting=false); 
  }
}
