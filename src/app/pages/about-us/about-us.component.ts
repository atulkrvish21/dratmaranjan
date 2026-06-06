
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from '../../services/clinic-content.service';
import { AppointmentComponent } from '../../sections/appointment/appointment.component';
import { FooterComponent } from '../../sections/footer/footer.component';

import { NavbarComponent } from '../../sections/navbar/navbar.component';

import { ScrollRevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-about-us',
imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    ScrollRevealDirective
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsComponent {
 private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
  specializations = [
    'Brain Tumors',
    'Spine Disorders',
    'Cerebrovascular Diseases',
    'Head Injuries & Trauma',
    'Nerve Compression',
    'Pediatric Neurosurgery',
    'Epilepsy & Movement Disorders',
    'Skull Base Surgery'
  ];

  education = [
    'MBBS – MKCG Medical College, Berhampur',
    'MS – General Surgery, SCB Medical College',
    'MCh – Neurosurgery, AIIMS New Delhi',
    'MRCS – Royal College of Surgeons, Edinburgh',
    'Fellowship in Minimally Invasive Spine Surgery – Singapore',
    'Fellowship in Skull Base Surgery – USA',
    'Fellowship in Cerebrovascular Surgery – Japan'
  ];

  recognitions = [
    'Pioneer in awake craniotomy & endoscopic spine surgery in Odisha',
    'Published 50+ research papers',
    'Young Neurosurgeon Award recipient',
    'Invited faculty at international conferences'
  ];

  stats = [
    {
      value: '2500+',
      label: 'Surgeries Performed'
    },
    {
      value: '16+',
      label: 'Years Experience'
    },
    {
      value: '98%',
      label: 'Patient Satisfaction'
    },
    {
      value: '50+',
      label: 'Research Publications'
    }
  ];
}
