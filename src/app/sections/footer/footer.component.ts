import { Component, Input } from '@angular/core';
import { DoctorProfile, NavLink } from '../../models/clinic-content.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input({ required: true }) links: NavLink[] = [];
  @Input({ required: true }) doctor!: DoctorProfile;
}
