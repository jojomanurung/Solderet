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
  colors: string[] = [];
  length = 30;
  chart!: Chart;
  delay = 1000;
  running = false;

  constructor(private sortChartService: SortChartService) {}

  ngOnInit(): void {
    if (this.sortChartService.isBrowser) {
      this.createChart();
    }
  }

  createChart() {
    const options = this.sortChartService.options;
    const array = this.sortChartService.newRandomArray(200, this.length);
    const data = this.sortChartService.createChartData(array);
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: data,
      options: options,
    });
    this.array = this.chart.data.datasets[0].data as number[];
    this.colors = this.chart.data.datasets[0].backgroundColor as string[];
  }

  generateNewArray() {
    const array = this.sortChartService.newRandomArray(200, this.length);
    const data = this.sortChartService.createChartData(array);
    this.chart.data = data;
    this.chart.update();
    this.array = this.chart.data.datasets[0].data as number[];
    this.colors = this.chart.data.datasets[0].backgroundColor as string[];
  }

  async run() {
    this.runBtn();
  }

  async runBtn() {
    this.running = true;
    await this.mergeSort(this.array, 0, this.array.length);
    await this.controlLoop();
    await this.resetColors();
    this.running = false;
  }

  async mergeSort(arr: number[], start: number, end: number) {
    if (start >= end - 1) return;
    let mid = start + ~~((end - start) / 2);

    await this.mergeSort(arr, start, mid);
    await this.mergeSort(arr, mid, end);

    let cache = Array(end - start).fill(arr[0]);
    let k = mid;

    for (let i = start, r = 0; i < mid; r++, i++) {
      if (!this.running) break;
      while (k < end && arr[k] < arr[i]) {
        cache[r] = arr[k];
        r++;
        k++;
      }
      cache[r] = arr[i];
    }

    for (let i = 0; i < k - start; i++) {
      if (!this.running) break;
      arr[i + start] = cache[i];
      this.changeColor(i + start, this.sortChartService.red);
      await this.sleep(this.delay / arr.length);
      this.resetColor(i + start);
    }
  }

  async controlLoop() {
    let delay = this.delay / this.array.length / 2;
    let anim_length = this.array.length / 6;
    for (let i = 0; i < this.array.length + anim_length; i++) {
      if (!this.running) break;

      if (i < this.array.length) {
        this.changeColor(i, this.sortChartService.green);
      }

      await this.sleep(delay);
    }
  }

  changeColor(i: number, color: string) {
    this.colors[i] = color;
    this.chart.update('none');
  }

  resetColor(i: number) {
    this.colors[i] = this.sortChartService.blue;
    this.chart.update('none');
  }

  async resetColors() {
    let delay = this.delay / this.array.length / 2;
    for (let i = 0; i < this.colors.length; i++) {
      this.resetColor(i);
      await this.sleep(delay);
    }
  }

  sleep(delay: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
}
