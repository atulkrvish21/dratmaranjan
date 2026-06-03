import { Component, Input } from '@angular/core';
import { DoctorProfile } from '../../models/clinic-content.model';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-about-doctor',
  standalone: true,
  imports: [SectionHeadingComponent],
  templateUrl: './about-doctor.component.html'
})
export class AboutDoctorComponent {
  @Input({ required: true }) doctor!: DoctorProfile;
}
