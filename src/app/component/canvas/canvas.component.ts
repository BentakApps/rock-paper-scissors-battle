import { AfterContentInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { TimeService } from 'src/app/service/time.service';
import { Piece } from './element/piece.element';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterContentInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @Output() updateCountEvent = new EventEmitter<any>();
  private DISPLAY!: CanvasRenderingContext2D | null;
  private pieces:Piece[] = [];
  private numberOfPieces = 30;
  private rCount:number=this.numberOfPieces;
  private pCount:number=this.numberOfPieces;
  private sCount:number=this.numberOfPieces;
  constructor(
    private timeService:TimeService
  ) {}
  ngAfterContentInit() {
    this.DISPLAY = this.canvas.nativeElement.getContext('2d', { alpha:false, desynchronized:false });
    this.resizeCanvas(this.DISPLAY!.canvas);
    for(let j=0;j<this.numberOfPieces;j++){
      this.createPiece("r");
      this.createPiece("p");
      this.createPiece("s");
    }
    this.timeService.delta$?.subscribe(deltaT => this.animate(deltaT));
  }
  createPiece = (kind: "r"|"p"|"s") => {
    const randomX = Math.random() * this.DISPLAY!.canvas.width;
    const randomY = Math.random() * this.DISPLAY!.canvas.height; 
    this.pieces.push(new Piece(kind, randomX, randomY));
  }
  animate(deltaT: number): void {
    this.clearCanvas();
    this.DISPLAY!.imageSmoothingEnabled = false;
    this.pieces.forEach(pc=>this.checkCollision(pc));
    this.pieces.forEach(pc=>pc.draw(deltaT/1000,this.DISPLAY!));
    this.updateCountEvent.emit({r:this.rCount,p:this.pCount,s:this.sCount});
  }
  checkCollision(piece:Piece){
    this.pieces.forEach(pc => {
      const dist = Math.sqrt(Math.pow(pc.x-piece.x,2)+Math.pow(pc.y-piece.y,2));
      if(dist < 20  && this.win(pc,piece)) {
        this.defeat(piece);
      }
    });
  }
  win = (p1:Piece, p2:Piece)=> 
    p1.kind=="r" && p2.kind=="s" || 
    p1.kind=="p" && p2.kind=="r" ||
    p1.kind=="s" && p2.kind=="p";
  defeat = (pc:Piece) => {
    switch(pc.kind) {
      case "r":
        pc.kind="p";
        this.rCount--;
        this.pCount++;
        break;
      case "p":
        pc.kind="s";
        this.pCount--;
        this.sCount++;
        break;
      case "s":
        pc.kind="r";
        this.sCount--;
        this.rCount++;
        break;
    }
  }
  clearCanvas() {
    this.DISPLAY!.clearRect(0, 0, this.DISPLAY!.canvas.width, this.DISPLAY!.canvas.height);
  }
  resizeCanvas(canvas: HTMLCanvasElement): void {
    let headerSize = 57;
    let clientHeight = document.documentElement.clientHeight;
    let clientWidth  = document.documentElement.clientWidth;
    canvas.height = clientHeight - headerSize;
    canvas.width = clientWidth;
    this.DISPLAY!.textAlign = "center";
    this.DISPLAY!.textBaseline = "middle";
    this.DISPLAY!.font = "30px Arial";
    this.DISPLAY!.fillStyle = "white";
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.resizeCanvas(this.DISPLAY!.canvas);
  }
}