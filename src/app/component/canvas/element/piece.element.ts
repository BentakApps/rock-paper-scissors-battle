import { Subject } from "rxjs";
import { AnimatedElement } from "./animatedElement.interface";

export class Piece implements AnimatedElement {
  public kind!: "r" | "p" | "s";
  public x: number;
  public y: number;
  private v: number = 300;
  private r = String.fromCodePoint(0x1FAA8);
  private p = String.fromCodePoint(0x1F4DC);
  private s = "\u2702";
  private border = 10;
  
  event$: Subject<any> = new Subject();
      
  constructor(
    kind:"r"|"p"|"s",
    x:number,
    y:number
  ) { 
    this.kind = kind;
    this.x = x;
    this.y = y;
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
        ctx.fillText(this.r, this.x, this.y);    
        break;
      case "p":
        ctx.fillText(this.p, this.x, this.y);
        break;
      case "s":
        ctx.fillText(this.s, this.x, this.y);
        break;
    }
  }
}
