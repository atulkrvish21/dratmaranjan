
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject,OnInit, Renderer2 } from '@angular/core';
import { ClinicContentService } from 'src/app/services/clinic-content.service';
import { AppointmentComponent } from '../../sections/appointment/appointment.component';
import { FooterComponent } from 'src/app/sections/footer/footer.component';

import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';

import { ScrollRevealDirective } from 'src/app/shared/scroll-reveal/scroll-reveal.directive';
import { FormsModule } from '@angular/forms';

interface FaqItem {
  question: string;
  answer: string;
  open?: boolean;
}

@Component({
  selector: 'app-faq',
imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    ScrollRevealDirective,
    AppointmentComponent,
    FormsModule
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent  implements OnInit {

constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {

    const script = this.renderer.createElement('script');

    script.type = 'application/ld+json';

    const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": this.faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

    script.text = JSON.stringify(faqSchema);
    this.renderer.appendChild(this.document.head, script);
  }



  private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
  searchTerm = '';

  faqs: FaqItem[] = [
    {
      question: 'When should I consult a neurosurgeon?',
      answer:
        'You should consult a neurosurgeon if you experience persistent back pain, neck pain, weakness, numbness, seizures, brain tumors, stroke symptoms or spinal disorders.'
    },
    {
      question: 'Is spine surgery painful?',
      answer:
        'Modern minimally invasive spine surgery causes significantly less pain and faster recovery than traditional surgery.'
    },
    {
      
      question: 'What are the warning signs of stroke?',
      answer:
        'Face drooping, arm weakness, speech difficulty and sudden vision loss require immediate medical attention.'
    },
    {
      
      question: 'Are all brain tumors cancerous?',
      answer:
        'No. Many brain tumors are benign and can be treated successfully depending on location and size.'
    },
    {
     
      question: 'How can I book an appointment?',
      answer:
        'You can book through the appointment form, WhatsApp, phone call or hospital OPD.'
    }
  ];

  toggle(item: FaqItem): void {
    item.open = !item.open;
  }

  get filteredFaqs() {

    if (!this.searchTerm.trim()) {
      return this.faqs;
    }

    return this.faqs.filter(
      x =>
        x.question.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        x.answer.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
