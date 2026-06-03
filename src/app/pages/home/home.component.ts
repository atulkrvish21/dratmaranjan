import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from '../../services/clinic-content.service';
import { AboutDoctorComponent } from '../../sections/about-doctor/about-doctor.component';
import { AppointmentComponent } from '../../sections/appointment/appointment.component';
import { ConditionsComponent } from '../../sections/conditions/conditions.component';
import { FaqComponent } from '../../sections/faq/faq.component';
import { FooterComponent } from '../../sections/footer/footer.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { NavbarComponent } from '../../sections/navbar/navbar.component';
import { ServicesComponent } from '../../sections/services/services.component';
import { TestimonialsComponent } from '../../sections/testimonials/testimonials.component';
import { WhyChooseUsComponent } from '../../sections/why-choose-us/why-choose-us.component';
import { ScrollRevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    NavbarComponent,
    HeroComponent,
    AboutDoctorComponent,
    ServicesComponent,
    ConditionsComponent,
    WhyChooseUsComponent,
    TestimonialsComponent,
    FaqComponent,
    AppointmentComponent,
    FooterComponent,
    ScrollRevealDirective
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
}
