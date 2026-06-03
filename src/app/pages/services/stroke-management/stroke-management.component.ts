
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from 'src/app/services/clinic-content.service';

import { FooterComponent } from 'src/app/sections/footer/footer.component';

import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';
import { ScrollRevealDirective } from 'src/app/shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-stroke-management',
  imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    ScrollRevealDirective
  ],
  templateUrl: './stroke-management.component.html',
  styleUrl: './stroke-management.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrokeManagementComponent {
private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
  strokeTypes = [
    'Ischemic Stroke (Blockage)',
    'Hemorrhagic Stroke (Bleeding)',
    'Transient Ischemic Attack (Mini-stroke)',
    'Brain Aneurysm',
    'AV Malformations'
  ];

  treatments = [
    'Mechanical Thrombectomy',
    'Intravenous Thrombolysis (Clot Buster)',
    'Emergency Aneurysm Coiling',
    'Surgical Clipping',
    'Decompressive Craniectomy'
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
}
