
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClinicContentService } from 'src/app/services/clinic-content.service';
import { AppointmentComponent } from '../../sections/appointment/appointment.component';
import { FooterComponent } from 'src/app/sections/footer/footer.component';

import { NavbarComponent } from 'src/app/sections/navbar/navbar.component';

import { ScrollRevealDirective } from 'src/app/shared/scroll-reveal/scroll-reveal.directive';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-contactus',
imports: [
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
    AppointmentComponent,
    ScrollRevealDirective,
    ReactiveFormsModule
  ],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactusComponent {
 
private readonly clinicContent = inject(ClinicContentService);
  readonly content$ = this.clinicContent.getContent();
  

private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: [''],
    message: ['']
  });

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);

    // API Call Here
  }
}
