import { Component, Input } from '@angular/core';
import { CardItem, StatItem } from '../../models/clinic-content.model';
import { MedicalIconComponent } from '../../shared/medical-icon/medical-icon.component';
import { StatCardComponent } from '../../shared/stat-card/stat-card.component';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [StatCardComponent, MedicalIconComponent],
  templateUrl: './why-choose-us.component.html'
})
export class WhyChooseUsComponent {
  @Input({ required: true }) stats: StatItem[] = [];
  @Input({ required: true }) trust: CardItem[] = [];
}
