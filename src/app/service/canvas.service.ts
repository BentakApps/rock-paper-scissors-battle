import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  public tile_sheet = new Image();
  public spriteLoaded$ = new Subject<void>();

  constructor() {
    this.tile_sheet.src = "assets/sprites.png";
    this.tile_sheet.onload = () => {
      this.spriteLoaded$.complete();
    }
  }
  resizeCanvas(ctx: CanvasRenderingContext2D): void {
    let headerSize = 57;
    let footerSize = 100;
    let clientHeight = document.documentElement.clientHeight;
    let clientWidth  = document.documentElement.clientWidth;
    
    ctx.canvas.height = clientHeight - headerSize - footerSize;
    ctx.canvas.width = clientWidth;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
  }
  clearCanvas(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

}