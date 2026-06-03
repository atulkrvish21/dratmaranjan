import { Component, Input } from '@angular/core';
import { CardItem } from '../../models/clinic-content.model';
import { MedicalIconComponent } from '../../shared/medical-icon/medical-icon.component';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SectionHeadingComponent, MedicalIconComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  @Input({ required: true }) services: CardItem[] = [];
}
