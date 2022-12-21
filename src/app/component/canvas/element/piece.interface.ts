import { AnimatedElement } from "./animatedElement.interface";

export interface Piece extends AnimatedElement{
  kind:"r" | "p" | "s";
  x:number;
  y:number;
}