import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointsService {
  constructor(private observer: BreakpointObserver) {}

  isBelowSm() {
    return this.observer
      .observe(['(max-width: 575px)'])
      .pipe(map((isBelowSm) => isBelowSm.matches));
  }

  isBelowMd() {
    return this.observer.observe(['(max-width: 767px)']).pipe(map((isBelowMd) => isBelowMd.matches));
  }

  isBelowLg() {
    return this.observer.observe(['(max-width: 991px)']).pipe(map((isBelowLg) => isBelowLg.matches));
  }

  isBelowXl() {
    return this.observer.observe(['(max-width: 1199px)']).pipe(map((isBelowXl) => isBelowXl.matches));
  }
}
