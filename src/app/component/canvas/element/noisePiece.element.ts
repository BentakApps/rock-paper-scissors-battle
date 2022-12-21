import { Subject } from "rxjs";
import { CanvasService } from "src/app/service/canvas.service";
import { AnimatedElement } from "./animatedElement.interface";
import { Piece } from "./piece.interface";

export class NoisePiece implements Piece {
  public kind!: "r" | "p" | "s";
  public x: number;
  public y: number;
  private v: number = 300;
  private border = 18;
  private canvasService;

  event$: Subject<any> = new Subject();
      
  constructor(
    kind:"r"|"p"|"s",
    width:number,
    height:number,
    canvasService:CanvasService
  ) { 
    this.kind = kind;
    this.x = Math.random() * width;
    this.y = Math.random() * height; 
    this.canvasService = canvasService;
  }
  draw(deltaT: number, ctx: CanvasRenderingContext2D) {
    let angle = Math.random() * 2 * Math.PI;
    if(this.x < this.border) angle = 0;
    if(this.x > ctx.canvas.width - this.border) angle = Math.PI;
    if(this.y < this.border) angle = Math.PI / 2;
    if(this.y > ctx.canvas.height - this.border) angle = 3 * Math.PI / 2;

    this.x = this.x + this.v * Math.cos(angle) * deltaT;
    this.y = this.y + this.v * Math.sin(angle) * deltaT;
    switch(this.kind) {
      case "r":
        ctx.drawImage(this.canvasService.tile_sheet,
          0,0,72,72,this.x-18,this.y-18,36,36);
        break;
      case "p":
        ctx.drawImage(this.canvasService.tile_sheet,
          72,0,72,72,this.x-18,this.y-18,36,36);
        break;
      case "s":
        ctx.drawImage(this.canvasService.tile_sheet,
          144,0,72,72,this.x-18,this.y-18,36,36);
        break;
    }
  }
}