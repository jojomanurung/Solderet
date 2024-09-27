import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { Observable } from 'rxjs';
import { BreakpointsService } from '../../services/breakpoints/breakpoints.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ButtonModule, InputTextModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isBelowSm$: Observable<boolean>;

  constructor(private bp: BreakpointsService) {
    this.isBelowSm$ = this.bp.isBelowSm();
  }
}
