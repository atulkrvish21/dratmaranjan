import { Component, Input } from '@angular/core';
import { CardItem } from '../../models/clinic-content.model';
import { MedicalIconComponent } from '../../shared/medical-icon/medical-icon.component';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';
import { Router, RouterLink } from '@angular/router';
import { AppointmentModelService } from 'src/app/services/appointment-model.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SectionHeadingComponent, MedicalIconComponent,RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  @Input({ required: true }) services: CardItem[] = [];
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
}
