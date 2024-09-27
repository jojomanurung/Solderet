import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortVisualizerComponent } from './sort-visualizer.component';

describe('SortVisualizerComponent', () => {
  let component: SortVisualizerComponent;
  let fixture: ComponentFixture<SortVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
