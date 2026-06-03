import { Component, Input } from '@angular/core';
import { StatItem } from '../../models/clinic-content.model';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  templateUrl: './stat-card.component.html'
})
export class StatCardComponent {
  @Input({ required: true }) stat!: StatItem;
}
