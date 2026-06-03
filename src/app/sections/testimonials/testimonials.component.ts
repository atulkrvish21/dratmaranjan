import { Component, Input } from '@angular/core';
import { Testimonial } from '../../models/clinic-content.model';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [SectionHeadingComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  @Input({ required: true }) testimonials: Testimonial[] = [];
  activeIndex = 0;

  get activeTestimonial(): Testimonial | undefined {
    return this.testimonials[this.activeIndex];
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.testimonials.length;
  }

  previous(): void {
    this.activeIndex = (this.activeIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
}
