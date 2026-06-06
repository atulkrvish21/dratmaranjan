
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from 'src/app/services/clinic-content.service';
import { AppointmentComponent } from 'src/app/sections/appointment/appointment.component';
import { FooterComponent } from 'src/app/sections/footer/footer.component';

import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';
import { ScrollRevealDirective } from 'src/app/shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-spine-fixation-decompression',
   imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    ScrollRevealDirective
  ],
  templateUrl: './spine-fixation-decompression.component.html',
  styleUrl: './spine-fixation-decompression.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpineFixationDecompressionComponent {
private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
  decompressionProcedures = [
    'Laminectomy & Laminoplasty',
    'Foraminotomy',
    'Discectomy',
    'Corpectomy',
    'Microsurgical Decompression'
  ];

  fixationTechniques = [
    'Pedicle Screw Fixation',
    'Lateral Mass Screws',
    'Anterior Cervical Plating',
    'Interbody Cages (TLIF, PLIF, ALIF)',
    'Minimally Invasive Fixation'
  ];
  protocols = [
    {
      icon: '🚨',
      title: 'Emergency Care',
      duration: '0 - 4.5 Hours',
      description:
        'Immediate CT/MRI, IV thrombolysis and mechanical thrombectomy for rapid clot removal.',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: '🏥',
      title: 'Acute Care',
      duration: '24 - 72 Hours',
      description:
        'ICU monitoring, blood pressure control, complication prevention and early mobilization.',
      color: 'from-medical-600 to-cyan-500'
    },
    {
      icon: '🌱',
      title: 'Rehabilitation',
      duration: 'Recovery Phase',
      description:
        'Physical therapy, speech therapy, occupational rehabilitation and psychological support.',
      color: 'from-emerald-500 to-green-500'
    }
  ];
    indications = [
    {
      icon: '📉',
      title: 'Spondylolisthesis',
      description:
        'When one vertebra slips forward over another causing instability and nerve compression.'
    },
    {
      icon: '⚠️',
      title: 'Spinal Stenosis',
      description:
        'Narrowing of spinal canal causing nerve compression that may require stabilization.'
    },
    {
      icon: '🚑',
      title: 'Traumatic Fractures',
      description:
        'Spinal fractures causing instability requiring fixation to prevent neurological damage.'
    },
    {
      icon: '🔄',
      title: 'Degenerative Scoliosis',
      description:
        'Progressive curvature causing pain and imbalance may require correction and stabilization.'
    },
    {
      icon: '🎯',
      title: 'Revision Surgery',
      description:
        'Failed previous spine surgeries may need additional fixation for stability.'
    },
    {
      icon: '🦠',
      title: 'Spinal Tumors / Infection',
      description:
        'After tumor removal or infection treatment, stabilization is often necessary.'
    }
  ];
}
