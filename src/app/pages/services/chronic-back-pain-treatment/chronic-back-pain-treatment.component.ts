
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from 'src/app/services/clinic-content.service';
import { AppointmentComponent } from 'src/app/sections/appointment/appointment.component';
import { FooterComponent } from 'src/app/sections/footer/footer.component';

import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';
import { ScrollRevealDirective } from 'src/app/shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-chronic-back-pain-treatment',
imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    ScrollRevealDirective
  ],
  templateUrl: './chronic-back-pain-treatment.component.html',
  styleUrl: './chronic-back-pain-treatment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChronicBackPainTreatmentComponent {
private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
 nonSurgicalTreatments = [
    'Medication Management',
    'Physical Therapy & Rehabilitation',
    'Epidural Steroid Injections',
    'Nerve Blocks & Radiofrequency Ablation',
    'Spinal Cord Stimulation',
    'Lifestyle Modification & Ergonomics'
  ];

  surgicalOptions = [
    'Microdiscectomy',
    'Minimally Invasive Decompression',
    'Endoscopic Spine Surgery',
    'Spinal Fusion & Fixation',
    'Artificial Disc Replacement'
  ];
 steps = [
    {
      icon: '🔍',
      title: 'Accurate Diagnosis',
      description:
        'Detailed history, clinical examination and advanced MRI/CT imaging to identify the exact cause of pain.'
    },
    {
      icon: '💊',
      title: 'Conservative Care',
      description:
        'Medications, physiotherapy and pain management procedures for 6-8 weeks whenever possible.'
    },
    {
      icon: '⚡',
      title: 'Minimally Invasive Procedures',
      description:
        'Endoscopic and minimally invasive treatments for faster recovery and less tissue damage.'
    },
    {
      icon: '🩺',
      title: 'Surgical Intervention',
      description:
        'Advanced spine surgery using modern techniques and implants for complex conditions.'
    },
    {
      icon: '🌱',
      title: 'Rehabilitation',
      description:
        'Post-treatment physiotherapy and recovery planning for optimal outcomes.'
    },
    {
      icon: '❤️',
      title: 'Lifestyle Optimization',
      description:
        'Long-term guidance on exercise, posture and spine health maintenance.'
    }
  ];
}
