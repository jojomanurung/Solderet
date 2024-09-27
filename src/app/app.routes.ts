import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sort_visualizer',
    loadComponent: () =>
      import('./pages/sort-visualizer/sort-visualizer.component').then(
        (c) => c.SortVisualizerComponent
      ),
  },
  {
    path: '',
    redirectTo: 'sort_visualizer',
    pathMatch: 'full'
  },
];
