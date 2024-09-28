import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortChartService {
  protected blueColor = '';
  protected redColor = '';
  protected greenColor = '';
  protected yellowColor = '';
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const documentStyle = getComputedStyle(document.documentElement);
      this.blueColor = documentStyle.getPropertyValue('--blue-500');
      this.redColor = documentStyle.getPropertyValue('--red-500');
      this.greenColor = documentStyle.getPropertyValue('--green-500');
      this.yellowColor = documentStyle.getPropertyValue('--yellow-400');
    }
  }

  newRandomArray(max: number, length: number = 5) {
    let arr: number[] = [];
    for (let i = 1; i <= max; i++) {
      arr.push(i);
    }

    let result = [];

    for (let i = 1; i <= length; i++) {
      const random = Math.floor(Math.random() * (max - i));
      result.push(arr[random]);
      arr[random] = arr[max - i];
    }

    return result;
  }

  createChartData(array: number[]) {
    let result = array.map((val) => {
      return {
        data: val,
        color: this.blueColor,
      };
    });

    return this.constructChart(result);
  }

  constructChart(randomArray: any[]) {
    let resNumber = randomArray.map((value) => value.data);
    let colorArray = randomArray.map((value) => value.color);
    const data = {
      labels: randomArray,
      datasets: [
        {
          backgroundColor: colorArray,
          data: resNumber,
        },
      ],
    };

    return data;
  }

  get blue() {
    return this.blueColor;
  }

  get red() {
    return this.redColor;
  }

  get green() {
    return this.greenColor;
  }

  get yellow() {
    return this.yellowColor;
  }

  get options() {
    return {
      categoryPercentage: 1.0,
      barPercentage: 0.99,
      events: [],
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            tickLength: 0,
          },
        },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            tickLength: 0,
          },
          border: {
            display: false,
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
    };
  }
}
