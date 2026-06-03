import { Component, Input } from '@angular/core';
import { CardItem } from '../../models/clinic-content.model';
import { MedicalIconComponent } from '../../shared/medical-icon/medical-icon.component';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-conditions',
  standalone: true,
  imports: [SectionHeadingComponent, MedicalIconComponent],
  templateUrl: './conditions.component.html'
})
export class ConditionsComponent {
  @Input({ required: true }) conditions: CardItem[] = [];
}
