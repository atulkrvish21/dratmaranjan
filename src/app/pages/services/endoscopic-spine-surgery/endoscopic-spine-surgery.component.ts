
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from 'src/app/services/clinic-content.service';

import { FooterComponent } from 'src/app/sections/footer/footer.component';

import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';
import { ScrollRevealDirective } from 'src/app/shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-endoscopic-spine-surgery',
imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
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
      icon: '💪',
      title: 'Less Muscle Damage',
      description:
        'Smaller incisions preserve surrounding muscles and tissues.'
    },
    {
      icon: '⚡',
      title: 'Faster Recovery',
      description:
        'Most patients walk within 4-6 hours and return home quickly.'
    },
    {
      icon: '🩸',
      title: 'Less Blood Loss',
      description:
        'Reduced operative trauma means minimal blood loss during surgery.'
    },
    {
      icon: '😌',
      title: 'Less Pain',
      description:
        'Significantly reduced post-operative pain and smaller scars.'
    },
    {
      icon: '🏠',
      title: 'Shorter Hospital Stay',
      description:
        'Typically 1-2 days compared to traditional open surgery.'
    },
    {
      icon: '🎯',
      title: 'High Precision',
      description:
        'Endoscopic visualization provides enhanced surgical accuracy.'
    }
  ];
}
