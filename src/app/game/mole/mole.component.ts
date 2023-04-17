// mole.component.ts

import { APP_BASE_HREF } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, concatMap, delay, fromEvent, map, merge, scan, shareReplay, startWith, take, takeUntil, timer } from 'rxjs';
import { peep, trackGameTime, whackAMole } from '../custom-operators';
import { SCORE_ACTION } from './mole.enum';

@Component({
  selector: 'app-mole',
  template: `
    <h1>Whack-a-mole! <span class="score">{{ score$ | async }}</span></h1>
    <button #start class="start">Start!</button>
    <ng-container *ngIf="{ timeLeft: timeLeft$ | async } as data">
      <span class="duration">{{ data.timeLeft | remainingTime }}</span>
    </ng-container>
    <ng-container *ngIf="{ delayGameMsg: delayGameMsg$ | async } as data">
      <span class="message">{{ data.delayGameMsg | whackAMoleMessage }}</span>
    </ng-container>
    <div class="game">
      <div class="hole hole1" [style]="'--hole-image:' + holeSrc" #hole1>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole1></div>
      </div>
      <div class="hole hole2" [style]="'--hole-image:' + holeSrc" #hole2>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole2></div>
      </div>
      <div class="hole hole3" [style]="'--hole-image:' + holeSrc" #hole3>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole3></div>
      </div>
      <div class="hole hole4" [style]="'--hole-image:' + holeSrc" #hole4>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole4></div>
      </div>
      <div class="hole hole5" [style]="'--hole-image:' + holeSrc" #hole5>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole5></div>
      </div>
      <div class="hole hole6" [style]="'--hole-image:' + holeSrc" #hole6>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole6></div>
      </div>
    </div>`,
  styleUrls: ['mole.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoleComponent implements OnInit, OnDestroy {

  @ViewChild('start', { static: true, read: ElementRef })
  startButton!: ElementRef<HTMLButtonElement>;

  @ViewChild('hole1', { static: true, read: ElementRef })
  hole1!: ElementRef<HTMLDivElement>;

  ... repeat the same step for hole2, hole3, hole4, hole5 and hole6 ...  

  @ViewChild('mole1', { static: true, read: ElementRef })
  mole1!: ElementRef<HTMLDivElement>;

  ... repeat the same step for mole2, mole3, mole4, mole5 and mole6 ...  

  score$!: Observable<number>;
  timeLeft$!: Observable<number>;
  delayGameMsg$!: Observable<number>
  subscription = new Subscription();
  lastHoleUpdated = new BehaviorSubject<number>(-1);

  constructor(@Inject(APP_BASE_HREF) private baseHref: string) { }

  ngOnInit(): void {
    this.score$ = of(0);  
    this.delayGameMsg = of(3);   
    this.timeLeft$ = of(10);
  }

  get moleSrc(): string {
    return this.buildImage('mole.svg');
  }

  get holeSrc(): string {
    return this.buildImage('dirt.svg');
  }

  private buildImage(image: string) {
    const isEndWithSlash = this.baseHref.endsWith('/');
    const imagePath = `${this.baseHref}${isEndWithSlash ? '' : '/'}assets/images/${image}`;
    return `url('${imagePath}')`
  }

  ngOnDestroy(): void {}
}