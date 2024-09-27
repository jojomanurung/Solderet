import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { SliderModule } from 'primeng/slider';
import { HeaderComponent } from '../../components/header/header.component';
import { SortChartService } from '../../services/sort-chart/sort-chart.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sort-visualizer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    ChartModule,
    ButtonModule,
    SliderModule,
  ],
  templateUrl: './sort-visualizer.component.html',
  styleUrl: './sort-visualizer.component.scss',
})
export class SortVisualizerComponent implements OnInit {
  array: number[] = [];
  length = 30;
  options: any;
  chart!: Chart;
  data: any;
  delay = 100;

  constructor(private sortChartService: SortChartService) {}

  ngOnInit(): void {
    if (this.sortChartService.isBrowser) {
      this.createChart();
    }
  }

  createChart() {
    this.options = this.sortChartService.options;
    this.array = this.sortChartService.newRandomArray(30, 200, this.length);
    this.data = this.sortChartService.createChartData(this.array);
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: this.data,
      options: this.options,
    });
  }

  generateNewArray() {
    this.array = this.sortChartService.newRandomArray(30, 200, this.length);
    this.data = this.sortChartService.createChartData(this.array);
    this.chart.data = this.data;
    this.chart.update();
  }

  // mergeSort() {
  //   const sortHistory = this.sortChartService.doSort(this.array);

  //   let historyIndex = 0;
  //   let timeout = 0;
  //   do {
  //     let result: any = [];
  //     for (let i = 0; i < sortHistory[historyIndex].length; i++) {
  //       result.push({
  //         data: sortHistory[historyIndex][i],
  //         color:
  //           sortHistory[historyIndex][i] <=
  //           sortHistory[historyIndex][
  //             i + 1 <= sortHistory[historyIndex].length - 1 ? i + 1 : i
  //           ]
  //             ? this.sortChartService.blue
  //             : this.sortChartService.red,
  //       });
  //     }
  //     timeout += 1000;
  //     this.chartUpdateDelay(result, timeout);
  //     historyIndex++;
  //   } while (historyIndex <= sortHistory.length - 1);
  // }

  async mergeSort() {
    let array = this.chart.data.datasets[0].data as number[];
    let color = this.chart.data.datasets[0].backgroundColor as string[];
    let length = array.length;
    let array0 = array;
    let array1 = new Array(length);
    let color1 = new Array(length).map(() => this.sortChartService.blue);

    for (let i = 1; i < length; i *= 2) {
      for (let j = 0; j < length; j += 2 * i) {
        let right = Math.min(j + i, length);
        let end = Math.min(j + 2 * i, length);
        await this.merge(array0, array1, j, right, end, color, color1);
      }
      let temp = array0;
      array0 = array1;
      array1 = temp;

      let tempColor = color;
      color = color1;
      color1 = tempColor;
    }
  }

  async merge(
    array0: number[],
    array1: number[],
    leftIdx: number,
    rightIdx: number,
    end: number,
    color: string[],
    color1: string[],
  ) {
    let k = leftIdx;
    let left = leftIdx;
    let right = rightIdx;

    while (k < end) {
      color[k] = this.sortChartService.red;
      color[right] = this.sortChartService.yellow
      if (left < rightIdx && (right >= end || array0[left] <= array0[right])) {
        array1[k] = array0[left];
        color1[k] = this.sortChartService.green;
        await this.chartUpdateDelay();
        left += 1;
      } else {
        array1[k] = array0[right];
        color1[k] = this.sortChartService.green;
        await this.chartUpdateDelay();
        right += 1;
      }

      k += 1;
    }
  }

  async chartUpdateDelay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.chart.update('none');
        resolve(`done`);
      }, this.delay);
    });
  }
}
