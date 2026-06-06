
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from 'src/app/services/clinic-content.service';
import { AppointmentComponent } from 'src/app/sections/appointment/appointment.component';
import { FooterComponent } from 'src/app/sections/footer/footer.component';

import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';
import { ScrollRevealDirective } from 'src/app/shared/scroll-reveal/scroll-reveal.directive';


@Component({
  selector: 'app-brain-tumor-surgery',
imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    ScrollRevealDirective
  ],
  templateUrl: './brain-tumor-surgery.component.html',
  styleUrl: './brain-tumor-surgery.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrainTumorSurgeryComponent {
private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
  
  conditions = [
    'Gliomas & Glioblastomas',
    'Meningiomas',
    'Pituitary Tumors',
    'Acoustic Neuromas',
    'Metastatic Brain Tumors',
    'Pediatric Brain Tumors'
  ];

  techniques = [
    'Awake Craniotomy',
    'Neuro-navigation Guided Surgery',
    'Intraoperative Neuromonitoring',
    'Endoscopic Skull Base Surgery',
    'Fluorescence-guided Resection'
  ];

  whyChoose = [
    {
      icon: '🧠',
      title: 'Brain Tumor Expertise',
      description:
        'Trained at AIIMS New Delhi with international fellowships in skull base surgery.'
    },
    {
      icon: '🛡️',
      title: 'Precision & Safety',
      description:
        'Advanced neuro-navigation for maximal safe tumor removal.'
    },
    {
      icon: '❤️',
      title: 'Compassionate Care',
      description:
        'Patient-first communication with dedicated post-operative follow-up.'
    }
  ];

  surgeryFlow = [
    {
      title: 'Before Surgery',
      items: [
        'Advanced MRI & CT evaluation',
        'Multidisciplinary consultation',
        'Pre-surgical counseling'
      ]
    },
    {
      title: 'During Surgery',
      items: [
        'Modern neuro-navigation OT',
        'Awake craniotomy if required',
        'Continuous neuromonitoring'
      ]
    },
    {
      title: 'Recovery',
      items: [
        'ICU monitoring',
        '5-7 days hospital stay',
        'Rehabilitation planning'
      ]
    }
  ];

  faqs = [
    {
      question: 'What is the success rate of brain tumor surgery?',
      answer:
        'Success depends on tumor type and location. Advanced technologies help achieve excellent outcomes with minimal neurological deficits.'
    },
    {
      question: 'Is brain tumor surgery risky?',
      answer:
        'Modern neuro-navigation and intraoperative monitoring significantly reduce risks during surgery.'
    },
    {
      question: 'How long is recovery after surgery?',
      answer:
        'Initial recovery usually takes 2-4 weeks while full recovery may take 6-12 weeks.'
    }
  ];

  activeFaq = 0;

  toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? -1 : index;
  }


  
}
