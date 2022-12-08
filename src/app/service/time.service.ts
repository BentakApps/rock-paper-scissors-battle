import { Inject, Injectable } from '@angular/core';
import { animationFrames, defer, Observable, TimestampProvider } from 'rxjs';
import { map, scan, share } from 'rxjs/operators';
import { TIMESTAMP_PROVIDER } from './tokens';
@Injectable({
  providedIn: 'root'
})
export class TimeService {
  clock$: Observable<number>;
  delta$: Observable<number>;
  previousTime!: number;
  constructor(@Inject(TIMESTAMP_PROVIDER) timestampProvider:TimestampProvider) {
    this.clock$ = animationFrames(timestampProvider).pipe(
      map(({timestamp})=>timestamp),
      share(),
    );
    this.delta$ = defer(() => {
      this.previousTime = timestampProvider.now();
      return this.clock$.pipe(
        scan<number, { time: number, delta: number }>( 
          (previous, current) => ({ time: current, delta: current - previous.time }), 
          { time: this.previousTime, delta: 0 }
        ),
        map(time => time.delta),
        share(),
      );
    });
  }
}