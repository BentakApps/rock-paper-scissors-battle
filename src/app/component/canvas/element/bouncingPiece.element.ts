import { Subject } from "rxjs";
import { CanvasService } from "src/app/service/canvas.service";
import { Piece } from "./piece.interface";

export class BouncingPiece implements Piece {
  public kind!: "r" | "p" | "s";
  public x: number;
  public y: number;
  private v: number = 100;
  private vx:number;
  private vy:number;
  private spriteSize:number = 36;
  private canvasService;

  event$: Subject<any> = new Subject();
      
  constructor(
    kind:"r"|"p"|"s",
    width:number,
    height:number,
    canvasService:CanvasService
  ) { 
    this.kind = kind;
    this.x = this.spriteSize/2 + Math.random() * (width-this.spriteSize);
    this.y = this.spriteSize/2 + Math.random() * (height-this.spriteSize);
    const angle = Math.random() * 2 * Math.PI;
    this.vx = this.v * Math.cos(angle);
    this.vy = this.v * Math.sin(angle);
    this.canvasService = canvasService;
  }
  draw(deltaT: number, ctx: CanvasRenderingContext2D) {
    if(this.x < this.spriteSize/2 || 
      this.x > ctx.canvas.width - this.spriteSize/2) this.vx = -this.vx;
    if(this.y < this.spriteSize/2 ||
      this.y > ctx.canvas.height - this.spriteSize/2) this.vy = -this.vy;

    this.x = this.x + this.vx * deltaT;
    this.y = this.y + this.vy * deltaT;
    switch(this.kind) {
      case "r":
        ctx.drawImage(this.canvasService.tile_sheet,0,0,72,72,
          this.x-this.spriteSize/2,this.y-this.spriteSize/2,
          this.spriteSize,this.spriteSize);
        break;
      case "p":
        ctx.drawImage(this.canvasService.tile_sheet,72,0,72,72,
          this.x-this.spriteSize/2,this.y-this.spriteSize/2,
          this.spriteSize,this.spriteSize);
        break;
      case "s":
        ctx.drawImage(this.canvasService.tile_sheet,144,0,72,72,
          this.x-this.spriteSize/2,this.y-this.spriteSize/2,
          this.spriteSize,this.spriteSize);
        break;
    }
  }
}
