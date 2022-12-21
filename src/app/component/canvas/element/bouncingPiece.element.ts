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
  private spriteSize:number;
  private scale:number;
  private canvasService;

  event$: Subject<any> = new Subject();
      
  constructor(
    kind:"r"|"p"|"s",
    width:number,
    height:number,
    scale:number,
    spriteSize:number,
    canvasService:CanvasService
  ) { 
    this.kind = kind;
    this.scale = scale;
    this.spriteSize = spriteSize;
    this.x = this.spriteSize/2 + Math.random() * (width-this.spriteSize);
    this.y = this.spriteSize/2 + Math.random() * (height-this.spriteSize);
    const angle = Math.random() * 2 * Math.PI;
    this.vx = this.v * Math.cos(angle);
    this.vy = this.v * Math.sin(angle);
    this.canvasService = canvasService;
  }
  draw(deltaT: number, ctx: CanvasRenderingContext2D) {
    if(this.x < this.spriteSize/2*this.scale || 
      this.x > ctx.canvas.width - this.spriteSize/2*this.scale) this.vx = -this.vx;
    if(this.y < this.spriteSize/2*this.scale ||
      this.y > ctx.canvas.height - this.spriteSize/2*this.scale) this.vy = -this.vy;

    this.x = this.x + this.vx *this.scale * deltaT;
    this.y = this.y + this.vy *this.scale * deltaT;
    switch(this.kind) {
      case "r":
        ctx.drawImage(this.canvasService.tile_sheet,0,0,72,72,
          this.x-this.spriteSize/2*this.scale,this.y-this.spriteSize/2*this.scale,
          this.spriteSize*this.scale,this.spriteSize*this.scale);
        break;
      case "p":
        ctx.drawImage(this.canvasService.tile_sheet,72,0,72,72,
          this.x-this.spriteSize/2*this.scale,this.y-this.spriteSize/2*this.scale,
          this.spriteSize*this.scale,this.spriteSize*this.scale);
        break;
      case "s":
        ctx.drawImage(this.canvasService.tile_sheet,144,0,72,72,
          this.x-this.spriteSize/2*this.scale,this.y-this.spriteSize/2*this.scale,
          this.spriteSize*this.scale,this.spriteSize*this.scale);
        break;
    }
  }
}
