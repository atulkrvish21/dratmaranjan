import { Component, Input } from '@angular/core';
import { FaqItem } from '../../models/clinic-content.model';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [SectionHeadingComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  @Input({ required: true }) faqs: FaqItem[] = [];
  openIndex = 0;

  toggle(index: number): void {
    this.openIndex = this.openIndex === index ? -1 : index;
  }
}
