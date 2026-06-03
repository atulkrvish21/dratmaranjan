import { Component, Input } from '@angular/core';
import { DoctorProfile } from '../../models/clinic-content.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input({ required: true }) doctor!: DoctorProfile;

  readonly heroVideo = 'assets/images/site/dr-atmaranjan-hero-video.mp4';
  readonly heroHighlights = [
    'Complex Brain & Spine Surgeries',
    'Revision Spine Surgery Expert',
    'Minimally Invasive Techniques',
    'Brain Aneurysm & Endoscopic Surgery',
    'High-Risk Case Specialist'
  ];
}
