import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorProfile } from '../../models/clinic-content.model';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent {
  @Input({ required: true }) doctor!: DoctorProfile;

  readonly appointmentForm = new FormBuilder().nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{8,15}$/)]],
    date: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  submitted = false;

  submit(): void {
    this.submitted = true;

    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    console.info('Appointment request ready for API:', this.appointmentForm.getRawValue());
    this.appointmentForm.reset();
  }

  hasError(controlName: 'name' | 'phone' | 'date' | 'message'): boolean {
    const control = this.appointmentForm.controls[controlName];
    return control.invalid && (control.touched || this.submitted);
  }
}
