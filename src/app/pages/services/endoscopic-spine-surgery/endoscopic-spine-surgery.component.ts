
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from 'src/app/services/clinic-content.service';
import { AppointmentComponent } from 'src/app/sections/appointment/appointment.component';
import { FooterComponent } from 'src/app/sections/footer/footer.component';

import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';
import { ScrollRevealDirective } from 'src/app/shared/scroll-reveal/scroll-reveal.directive';
import { appConfig } from 'src/app/app.config';

@Component({
  selector: 'app-endoscopic-spine-surgery',
imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    ScrollRevealDirective
  ],
  templateUrl: './endoscopic-spine-surgery.component.html',
  styleUrl: './endoscopic-spine-surgery.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EndoscopicSpineSurgeryComponent {
private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
 conditions = [
    'Lumbar Disc Herniation',
    'Cervical Disc Herniation',
    'Foraminal Stenosis',
    'Recurrent Disc Herniation',
    'Spinal Cysts'
  ];

  techniques = [
    'Endoscopic Spine Surgery',
    'Microdiscectomy',
    'Minimally Invasive Laminectomy',
    'Percutaneous Pedicle Screw Fixation',
    'Oblique Lateral Lumbar Interbody Fusion'
  ];
benefits = [
    {
      icon: '📹',
      title: '8mm Incision',
      description:
        'Smaller than a keyhole with no muscle cutting and typically no stitches.'
    },
    {
      icon: '🏃',
      title: 'Same-Day Mobility',
      description:
        'Patients often walk within 2-4 hours after surgery.'
    },
    {
      icon: '💊',
      title: 'Local Anesthesia',
      description:
        'Can be performed under local anesthesia for selected high-risk patients.'
    },
    {
      icon: '🩸',
      title: 'Minimal Blood Loss',
      description:
        'Virtually bloodless procedure with minimal tissue disruption.'
    },
    {
      icon: '🏠',
      title: 'Day-Care Procedure',
      description:
        'Most patients are discharged within 24 hours.'
    },
    {
      icon: '🎯',
      title: 'Direct Visualization',
      description:
        'HD endoscopic camera provides an excellent view of the surgical area.'
    }
  ];
}
