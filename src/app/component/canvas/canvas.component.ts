import { AfterContentInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasService } from 'src/app/service/canvas.service';
import { TimeService } from 'src/app/service/time.service';
import { BouncingPiece } from './element/bouncingPiece.element';
import { NoisePiece } from './element/noisePiece.element';
import { Piece } from './element/piece.interface';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterContentInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @Input() mode!: "noise" | "bounce";
  @Input() onDefeat!: "replace" | "delete";
  @Output() updateCountEvent = new EventEmitter<any>();
  @Output() messageEvent = new EventEmitter<string>();
  private DISPLAY!: CanvasRenderingContext2D | null;
  private pieces:Piece[] = [];
  private numberOfPieces = 30;
  private rCount:number=this.numberOfPieces;
  private pCount:number=this.numberOfPieces;
  private sCount:number=this.numberOfPieces;
  private timeSubscription!: Subscription;
  constructor(
    private timeService:TimeService,
    private canvasService:CanvasService
  ) {}
  ngAfterContentInit() {
    this.DISPLAY = this.canvas.nativeElement.getContext('2d', { alpha:false, desynchronized:false });
    this.canvasService.spriteLoaded$.subscribe({
      complete: () => {
        this.canvasService.resizeCanvas(this.DISPLAY!);
        for(let j=0;j<this.numberOfPieces;j++){
          this.createPiece("r");
          this.createPiece("p");
          this.createPiece("s");
        }
        this.timeSubscription = this.timeService.delta$?.subscribe(deltaT => this.animate(deltaT));
      }
    });
  }
  createPiece = (kind: "r"|"p"|"s") => {
    switch(this.mode){
      case "noise":
        this.pieces.push(new NoisePiece(kind, this.DISPLAY!.canvas.width, this.DISPLAY!.canvas.height, this.canvasService));
        break;
      case "bounce":
        this.pieces.push(new BouncingPiece(kind, this.DISPLAY!.canvas.width, this.DISPLAY!.canvas.height, this.canvasService));
        break;
    }
  }
  animate(deltaT: number): void {
    this.canvasService.clearCanvas(this.DISPLAY!);
    this.DISPLAY!.imageSmoothingEnabled = false;
    this.checkCollisions();
    //this.pieces.forEach(pc=>this.checkCollision(pc));
    this.pieces.forEach(pc=>pc.draw(deltaT/1000,this.DISPLAY!));
    this.updateCountEvent.emit({r:this.rCount,p:this.pCount,s:this.sCount});
  }
  checkCollisions(){
    let i = this.pieces.length - 1;
    while(i >= 0){
      let piece = this.pieces[i];
      let j = this.pieces.length - 1;
      while(j >= 0){
        if(i != j){
          let pc = this.pieces[j];
          const dist = Math.sqrt(Math.pow(pc.x-piece.x,2)+Math.pow(pc.y-piece.y,2));
          if(dist < 36  && this.win(pc,piece)) {
            console.log(i);
            console.log(this.pieces);
            console.log(pc);
            console.log(piece);
            this.defeat(piece);
            j=0;
          }
        }
        j--;
      }
      i--;
    }
  }
  win = (p1:Piece, p2:Piece)=> 
    p1.kind=="r" && p2.kind=="s" || 
    p1.kind=="p" && p2.kind=="r" ||
    p1.kind=="s" && p2.kind=="p";
  defeat = (pc:Piece) => {
    switch(pc.kind) {
      case "r":
        this.rCount--;
        if(this.onDefeat=="replace"){
          pc.kind="p";
          this.pCount++;
        }
        break;
      case "p":
        this.pCount--;
        if(this.onDefeat=="replace"){
          pc.kind="s";
          this.sCount++;
        }
        break;
      case "s":
        this.sCount--;
        if(this.onDefeat=="replace"){
          pc.kind="r";
          this.rCount++;
        }
        break;
    }
    if(this.onDefeat=="delete"){
      this.pieces.splice(this.pieces.indexOf(pc),1);
    }
    if(this.pCount == 0 && this.sCount == 0){
      this.gameOver("ROCK WON!");
    }
    if(this.rCount == 0 && this.sCount == 0){
      this.gameOver("PAPER WON!");
    }
    if(this.rCount == 0 && this.pCount == 0){
      this.gameOver("SCISSORS WON!");
    }
  }
  gameOver = (message: string) => {
    this.messageEvent.emit(message);
    this.timeSubscription.unsubscribe();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.canvasService.resizeCanvas(this.DISPLAY!);
  }
}