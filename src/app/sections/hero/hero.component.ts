import { Component, Input } from '@angular/core';
import { DoctorProfile } from '../../models/clinic-content.model';
import { AppointmentModelService } from 'src/app/services/appointment-model.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input({ required: true }) doctor!: DoctorProfile;
constructor(
    private router: Router,
    public modalService: AppointmentModelService 
  ) {
   
  }

 triggerGlobalPopup(event: Event): void {
    console.log('➡️ Navbar Button Component physically clicked!');
    event.preventDefault();
    event.stopPropagation();
    this.modalService.open();
  }
  

  readonly heroVideo = 'assets/images/site/dr-atmaranjan-hero-video.mp4';
  readonly heroHighlights = [
    'Complex Brain & Spine Surgeries',
    'Revision Spine Surgery Expert',
    'Minimally Invasive Techniques',
    'Brain Aneurysm & Endoscopic Surgery',
    'High-Risk Case Specialist'
  ];
}
