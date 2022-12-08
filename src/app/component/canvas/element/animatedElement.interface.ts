import { Observable } from "rxjs";

export interface AnimatedElement {
    draw(deltaT: number,ctx:CanvasRenderingContext2D): void;
    event$: Observable<any>;
}