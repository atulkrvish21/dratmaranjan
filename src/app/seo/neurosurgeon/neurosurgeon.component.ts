
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from '../../services/clinic-content.service';
import { AppointmentComponent } from '../../sections/appointment/appointment.component';
import { FooterComponent } from '../../sections/footer/footer.component';
import { ActivatedRoute, Router,RouterLink } from "@angular/router";
import { NavbarComponent } from '../../sections/navbar/navbar.component';
import {  AppointmentModelService } from '../../services/appointment-model.service';
import { ScrollRevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-neurosurgeon',
imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    ScrollRevealDirective,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './neurosurgeon.component.html',
  styleUrl: './neurosurgeon.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeurosurgeonComponent {
private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
    private readonly route = inject(ActivatedRoute);
    private readonly modalService = inject(AppointmentModelService);
  // 1. Get the slug synchronously from the current route snapshot
  readonly slug = this.route.snapshot.paramMap.get('slug');

  triggerGlobalPopup(event: Event): void {
    
    event.preventDefault();
    event.stopPropagation();
    this.modalService.open();
  }
}
