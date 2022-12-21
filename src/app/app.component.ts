import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameOverComponent } from './component/game-over/game-over.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'rock-paper-scissors-battle';
  count = {r:0,p:0,s:0};
  gameOver:boolean = false;
  restarting:boolean = false;
  mode:"noise"|"bounce" = "noise";
  onDefeat:"replace"|"delete" = "replace";

  constructor (
    public dialog:MatDialog
  ) {}
  
  updateCount = (count: any) => {
    this.count = {...count};
  }
  updateMessage = (message:string) => {
    const dialogRef = this.dialog.open(GameOverComponent,{
      data:message
    });
    dialogRef.afterClosed().subscribe(() => this.restart());
    this.gameOver = true;
  }
  restart = () => {
    this.restarting = true;
    setTimeout(()=>this.restarting=false);
    this.gameOver=false;
  }
}
